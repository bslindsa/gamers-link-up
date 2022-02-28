import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    games {
      _id
      title
      owner
      description
      platform
      price
      images
      datePosted
    }
  }
}
`;

export const GET_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    games {
      _id
      title
      owner
      description
      platform
      price
      images
      datePosted
    }
  }
}
`;

export const GET_USERS = gql`
query users {
  users {
    _id
    username
  }
}
`;

export const GET_GAME = gql`
query game($gameId: ID!) {
  game(gameId: $gameId) {
    _id
    title
    owner
    description
    platform
    price
    images
    datePosted
    tags
    requests {
      username
    }
  }
}
`;

export const GET_GAMES = gql`
query games {
  games {
    _id
    title
    owner
    description
    platform
    price
    images
    datePosted
    tags
    requests {
      username
    }
  }
}
`;

