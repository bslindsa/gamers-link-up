import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_GAME = gql`
mutation addGame($title: String!, $description: String, $platform: String) {
  addGame(title: $title, description: $description, platform: $platform) {
    _id
    title
    description
    platform
  }
}
`;

export const ADD_TAG = gql`
mutation addTag($gameId: ID!, $tagName: String!) {
  addTag(gameId: $gameId, tagName: $tagName) {
    title
    tags {
      tagName
    }
  }
}
`;

export const REMOVE_TAG = gql`
mutation removeTag($gameId: ID!, $tagName: String!) {
  title
  tags {
    tagName
  }
}
`;

export const EDIT_GAME = gql`
mutation editGame($gameId: ID!, $title: String, $description: String, $platform: String) {
  editGame(gameId: $gameId, title: $title, description: $description, platform: $platform) {
    _id
    title
    description
    platform
  }
}

`;

export const DELETE_GAME = gql`
mutation deleteGame($gameId: ID!) {
  deleteGame(gameId: $gameId) {
    _id
    title
  }
}
`;