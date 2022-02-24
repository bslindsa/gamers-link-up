const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    games: [Game]!
}

  type Game {
    _id: ID
    title: String
    owner: User
    description: String
    platform: String
    price: Number
    date_posted: String
    tags: [Tag]!
  }

  type Tag {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    games: [Game]
    game(gameId: ID!): Game
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGame(title: String!, description: String, platform: String, price: Number!): Game
    addTags(gameId: ID!, tagName: String!)
    editGame(gameId: ID!, title: String, description: String, platform: String, price: Number, tags: [Tag], gameId: ID!): Game
    deleteGame(gameId: ID!): Game
    requestGame(gameId: ID!): Game
  }
`;

module.exports = typeDefs;
