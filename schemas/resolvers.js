const fetch = require('node-fetch');
const { Work } = require('../models');

const resolvers = {
  Query: {
    // query composer by name
    composer: async (parent, { name }) => {
      const composerData = await fetch(
        `https://api.openopus.org/composer/list/search/${name}.json`
      );
      const data = await composerData.json();
      return data;
    },
    // query works by title and composer id
    works: async (parent, { compId, title }) => {
      const workData = await fetch(
        `https://api.openopus.org/work/list/composer/${compId}/genre/all/search/${title}.json`
      );
      const data = await workData.json();
      return data;
    },
    // query all pieces in database
    dbWorks: async () => {
      try {
        const worksResponse = await Work.find();
        return worksResponse;
      } catch (e) {
        return e;
      }
    }
  },
  Mutation: {
    // add a piece by id
    addWork: async (parent, { workId }) => {
      const workData = await fetch(
        `https://api.openopus.org/work/detail/${workId}.json`
      );
      const data = await workData.json();
      if (data.status.success === 'false') {
        return false;
      }

      // add work to db
      try {
        const workResponse = await Work.create({
          id: data.work.id,
          title: data.work.title,
          subtitle: data.work.subtitle,
          composer: {
            id: data.composer.id,
            name: data.composer.name,
            complete_name: data.composer.complete_name,
            epoch: data.composer.epoch
          },
          genre: data.work.genre
        });
        return workResponse;
      } catch (e) {
        return e;
      }
    },

    // remove piece by id
    removeWork: async (parent, { workId }) => {
      try {
        const deleteWorkResponse = await Work.findOneAndDelete(
          { id: workId },
          { new: true }
        );
        return deleteWorkResponse;
      } catch (e) {
        return e;
      }
    }
  }
};

module.exports = resolvers;
