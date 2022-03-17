// Operations with comments

import { UserInputError, AuthenticationError } from "apollo-server";
import Post from "../../models/Post.js";
import checkAuth from "../../utils/check-auth.js";

export const Mutation = {
  // Первый параметр - parent (нам он в данном случае не нужен)
  async createComment(_, { postId, body }, context) {
    const { username } = checkAuth(context);

    if (body.trim() === "") {
      throw new UserInputError("Empty comment", {
        errors: {
          body: "Comment field cannot be empty",
        },
      });
    }

    // Получаем пост из БД
    const post = await Post.findById(postId);

    if (post) {
      // Добавляем новый комментарий в _начало_(!)_массива_
      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      });

      await post.save();
      return post;
    } else throw UserInputError("Post not found");
  },

  async deleteComment(_, { postId, commentId }, context) {
    const { username } = checkAuth(context);
    const post = await Post.findById(postId);

    if (post) {
      const commentIndex = post.comments.findIndex((c) => c.id === commentId);
      if (post.comments[commentIndex].username === username) {
        post.comments.splice(commentIndex, 1);

        await post.save();

        return post;
      } else {
        throw new AuthenticationError("The operation is not allowed");
      }
    } else {
      throw new UserInputError("Post not found");
    }
  },
  // "Лайк" поста
  async likePost(_, { postId }, context) {
    const { username } = checkAuth(context);
    const post = await Post.findById(postId);

    if (post) {
      if (post.likes.find((l) => l.username === username)) {
        post.likes = post.likes.filter((l) => l.username !== username);
      } else {
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }


      await post.save();

      return post;
    } else {
      throw new UserInputError("Post not found");
    }
  },
};
