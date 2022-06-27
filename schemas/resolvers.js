const fetch = require('node-fetch');

const resolvers = {
  Query: {
    composer: async (parent, { name }) => {
      const composerData = await fetch(
        `https://api.openopus.org/composer/list/search/${name}.json`
      );
      const data = await composerData.json();
      return data;
    },
    works: async (parent, { compId, title }) => {
      const workData = await fetch(
        `https://api.openopus.org/work/list/composer/${compId}/genre/all/search/${title}.json`
      );
      const data = await workData.json();
      return data;
    }
  }
};

module.exports = resolvers;
