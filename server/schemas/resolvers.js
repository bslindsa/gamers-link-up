const { User, Game } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('games');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('games');
    },
    games: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Game.find(params).sort({ date_posted: -1 });
    },
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId });
    },
    me: async (parent, { arg }, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('games');
      }
      throw new AuthenticationError('You must be logged in');
    },
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addGame: async (parent, { title, description, platform }, context) => {
      if (context.user) {
        const game = await Game.create({
          title,
          owner: context.user.username,
          description,
          price,
          platform,
          date_posted: Date.now,
        });

        await User.findOneAndUpdate(
          { id: context.user._id },
          { $addToSet: { games: game._id } }
        );

        return game;
      }
      throw new AuthenticationError('You must be logged in.');
    },
    addTag: async (parent, { gameId, tagName }) => {
      const tag = await Game.findOneAndUpdate(
        { id: gameId },
        { $addToSet: { tags: tagName } }
      );
      return tag;
    },
    removeTag: async (parent, { gameId, tagName }) => {
      return Game.findOneAndUpdate(
      const tag = await Game.findOneAndDelete(
        { id: gameId },
        { $pull: { tags: tagName } },
        { new: true }
      );
    },
    deleteGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const game = await Game.findOneAndDelete({
          _id: gameId,
        });
        await User.findOneAndUpdate(
          { id: context.user._id },
          { $pull: { games: game._id } }
        )
      }
    },
    requestGame: async (parent, { gameId }, context) => {
      if (context.user) {
        return Game.findOneAndUpdate(
          { _id: gameId },
          {
            $addToSet: {
              requests: { username: context.user.username, email: context.user.email }
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You must be logged in');
    },
    editGame: async (parent, { gameId, title, description, platform }, context) => {
      return await Game.findOneAndUpdate(
        { _id: gameId },
        { title },
        { description },
        { price },
        { platform },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  },
};

module.exports = resolvers;
