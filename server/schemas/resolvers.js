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
  },
  Mutation: {
    addGame: async (parent, { title, description, platform, price }, context) => {
      if (context.user) {
        const game = await Game.create({
          title,
          description,
          platform,
          price
        });

        await User.findOneAndUpdate(
          {id: context.user._id},
          {$addToSet: {games: game._id}}
        );

        return game;
      }
      throw new AuthenticationError('You must be logged in.');
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
  },
};

module.exports = resolvers;
