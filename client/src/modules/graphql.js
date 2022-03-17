// GraphQL Query and Mutation Utility
import gql from 'graphql-tag'

// User authorization
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      avatar
      email
      createdAt
      token
    }
  }
`

// User registration
export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $avatar: String
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        avatar: $avatar
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      avatar
      email
      createdAt
      token
    }
  }
`

// Get all posts
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      avatar
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

// Getting one post by its id
export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      avatar
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

// Post creation
export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      avatar
      createdAt
      likeCount
      likes {
        id
        username
        createdAt
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`

// Deleting a post
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

// Like post
export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

// Create a comment
export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

// Deleting a comment
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`
