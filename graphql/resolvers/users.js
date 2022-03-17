// Custom Operations

import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserInputError } from "apollo-server";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";
import { SECRET_KEY } from "../../config/auth.config.js";

import User, { findOne } from "../../models/User.js";

const generateToken = (user) =>
  // Для генерации токена используется id, имя и email пользователя. Мы не можем включить в токен аватар,
  // поскольку строка получится слишком длинной (из-за преобразования изображения в строку в формате base64)
  sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    SECRET_KEY,
    {
      // Время, в течение которого токен считается действительным (1 час)
      expiresIn: "1h",
    }
  );

export const userMutation = {
  async login(_, { username, password }) {
    const { valid, errors } = validateLoginInput(username, password);
    if (!valid) throw new UserInputError("Errors", { errors });
    const user = await findOne({ username });
    if (!user) {
      errors.general = "User not found";
      throw new UserInputError("User not found", { errors });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      errors.general = "Incorrect password";
      throw new UserInputError("Incorrect password", { errors });
    }

    const token = generateToken(user);

    return {
      ...user._doc,
      id: user._id,
      token,
    };
  },

  async register(
    _,
    { registerInput: { username, avatar, email, password, confirmPassword } }
  ) {
    const { valid, errors } = validateRegisterInput(
      username,
      email,
      password,
      confirmPassword
    );

    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }

    const user = await findOne({ email });

    if (user)
      throw new UserInputError("Email is already in use", {
        errors: {
          email: "This email is already in use",
        },
      });

    password = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      avatar,
      email,
      password,
      confirmPassword,
      createdAt: new Date().toISOString(),
    });

    const res = await newUser.save();
    const token = generateToken(res);
    return {
      ...res._doc,
      id: res._id,
      token,
    };
  },
};
