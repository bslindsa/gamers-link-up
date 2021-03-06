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
    owner: String
    description: String
    platform: String
    price: Float
    images: [String]
    datePosted: String
    tags: [String]
    requests: [User]
  }

  type Messages {
    _id: ID
    owner: String
    sendTo: String
    timeSent: String
    message: String
    viewed: Boolean
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
    me: User
    inbox(owner: String!, sentTo: String!): Messages 
    outbox(owner: String!, sentTo: String!): Messages 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGame(title: String!, description: String, platform: String, price: Float, images: [String]): Game
    addTag(gameId: ID!, tagName: String!): Game
    removeTag(gameId: ID! tagName: String!): Game
    editGame(gameId: ID!, title: String, description: String, price: Float, platform: String, images: [String]): Game
    deleteGame(gameId: ID!): Game
    requestGame(gameId: ID!): Game
    sendMessage(owner: String!, sentTo:String!, message: String!): Messages
    viewMessage(messageId: ID!): Messages
  }
`;

module.exports = typeDefs;
