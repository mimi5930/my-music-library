const { response } = require('express');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
// const api = require('./routes');
// express setup
const PORT = process.env.PORT || 3001;
const app = express();
const fetch = require('node-fetch');

// graphql server setup
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
