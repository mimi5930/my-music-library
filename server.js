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

app.get('/composer/:comp', async (req, res) => {
  const { comp } = req.params;
  const response = await fetch(
    `https://api.openopus.org/composer/list/search/${comp}.json`
  );
  const data = await response.json();
  if (data.status.success === 'false')
    res.status(404).json({ message: data.status.error });
  if (data.status.rows > 1)
    res
      .status(404)
      .json({ message: 'Multiple composers found, refine search' });
  res.json(data);
});

app.get('/composer/:comp/piece/:piece', async (req, res) => {
  const { comp, piece } = req.params;
  // find composer
  const response = await fetch(
    `https://api.openopus.org/composer/list/search/${comp}.json`
  );
  const data = await response.json();
  if (data.status.success === 'false')
    res.status(404).json({ message: data.status.error });
  if (data.status.rows > 1)
    res
      .status(404)
      .json({ message: 'Multiple composers found, refine search' });
  // save composer's id
  const compId = data.composers[0].id;

  // find piece with comp Id and title
  const pieceResponse = await fetch(
    `https://api.openopus.org/work/list/composer/${compId}/genre/all/search/${piece}.json`
  );
  const pieceData = await pieceResponse.json();

  res.json(pieceData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
