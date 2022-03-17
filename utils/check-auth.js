// Authentication utility

import { verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { SECRET_KEY } from "../config/config.js";

export default (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        // Checking Authentication
        const user = verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Incorrect/Obsolete Token");
      }
    }

    throw new Error(
      "The authentication token should be of the form 'Bearer [token]'"
    );
  }
  throw new Error('HTTP header "Authorization" must be provided');
};
