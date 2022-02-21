const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const routes = require("./routes");
const { authMiddleware } = require("./utils/auth.js");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const init = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
    context: authMiddleware,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

init();
