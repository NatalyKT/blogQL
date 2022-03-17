// Aggregation of operations

import { userMutation } from "./users.js";
import { Query, postMutation, Subscription } from "./posts.js";
import { commentMutation } from "./comments.js";

export const Post = {
  likeCount: (parent) => parent.likes.length,
  commentCount: (parent) => parent.comments.length,
};
/*
export const Query = {
  ..._Query,
};
export const Mutation = {
  ..._Mutation,
  ...__Mutation,
  ...___Mutation,
};
export const Subscription = {
  ..._Subscription,
};

*/

export default [
  userMutation,
  Query, postMutation, Subscription, commentMutation];