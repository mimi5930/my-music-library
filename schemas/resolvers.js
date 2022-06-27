const fetch = require('node-fetch');

const resolvers = {
  Query: {
    composer: async (parent, { name }) => {
      const composerData = await fetch(
        `https://api.openopus.org/composer/list/search/${name}.json`
      );
      const data = await composerData.json();
      return data;
    }
  }
};

module.exports = resolvers;
