const { User, Game } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const Messages = require('../models/Messages');

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
    inbox: async (parent, { arg }, context) => {
      if (context.user) {
        return Messages.find({ sendTo: context.user.username }).populate('messages');
      }
      throw new AuthenticationError('You have no messages');
    },
    outbox: async (parent, { arg }, context) => {
      if (context.user) {
        return Messages.find({ owner: context.user.username }).populate('messages');
      }
      throw new AuthenticationError('You have no messages');
    }
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
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addGame: async (parent, { title, description, platform, price, images }, context) => {
      if (context.user) {
        const game = await Game.create({
          title,
          description,
          platform,
          price,
          images,
          owner: context.user.username
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
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
        { id: gameId },
        { $pull: { tags: tagName } },
        { new: true }
      );
    },
    deleteGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const game = await Game.findOneAndDelete({
          _id: gameId,
          owner: context.user.username
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
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
    editGame: async (parent, { gameId, title, description, platform, price, images }, context) => {
      return await Game.findOneAndUpdate(
        { _id: gameId },
        {
          title,
          description,
          platform,
          price,
          images
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    sendMessage: async (parent, { sendTo, message }, context) => {
        if(context.user) {
        const game = await Messages.create({
          owner: context.user.username,
          sendTo,
          message
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { messages: messages._id } }
        );

        await User.findOneAndUpdate(
          { username: sendTo },
          { $addToSet: { messages: messages._id } }
        );

        return messages;
      }
      throw new AuthenticationError('You must be logged in.');
    }
  },
};

module.exports = resolvers;
