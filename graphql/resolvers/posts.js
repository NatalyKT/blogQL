import { AuthenticationError } from "apollo-server";
import Post from "../../models/Post.js";
// TODO: Требуется для получения аватара
import { findById } from "../../models/User.js";
import checkAuth from "../../utils/check-auth.js";

export const Query = {
  // Получение всех постов из БД
  async getPosts() {
    try {
      // Получаем посты, сортируем их от последнего к первому
      const posts = await Post.find().sort({ createdAt: -1 });

      return posts;
    } catch (err) {
      throw new Error(err);
    }
  },
  // Получение поста по id
  async getPost(_, { postId }) {
    try {
      const post = await Post.findById(postId);

      if (post) {
        return post;
      }
      throw new Error("Post not found");
    } catch (err) {
      throw new Error(err);
    }
  },
};
export const postMutation = {
  async createPost(_, { body }, context) {
    const user = checkAuth(context);
    // Получаем аватар. Мы не можем включить его в токен, поскольку
    // строка получится слишком длинной (из-за преобразования изображения в строку в формате base64)
    const { avatar } = await findById(user.id);

    if (body.trim() === "") {
      throw new Error("Post field cannot be empty");
    }

    const newPost = new Post({
      body,
      user: user.id,
      username: user.username,
      avatar,
      createdAt: new Date().toISOString(),
    });

    const post = await newPost.save();

    context.pubSub.publish("NEW_POST", {
      newPost: post,
    });

    return post;
  },

  async deletePost(_, { postId }, context) {
    const user = checkAuth(context);

    try {
      const post = await Post.findById(postId);

      // Удалять посты может только добавивший их пользователь
      if (user.username === post.username) {
        await post.delete();

        return "The post has been deleted";
      }
      throw new AuthenticationError("The operation is not allowed");
    } catch (err) {
      throw new Error(err);
    }
  },
};
export const Subscription = {
  newPost: {
    subscribe: (_, __, { pubSub }) => pubSub.asyncIterator("NEW_POST"),
  },
};
