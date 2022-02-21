const User = require("../models/User");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error("Something is wrong");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
