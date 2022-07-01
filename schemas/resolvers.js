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
    },
    // query db for all works by composer id
    dbComposerId: async (parent, { compId }) => {
      try {
        const workDbResponse = await Work.find({ 'composer.id': compId });
        return workDbResponse;
      } catch (e) {
        return e;
      }
    },
    // query db for all works by composer name
    dbComposerName: async (parent, { name }) => {
      try {
        const workDbResponse = await Work.find({
          'composer.complete_name': new RegExp(name, 'i')
        });
        return workDbResponse;
      } catch (e) {
        return e;
      }
    },
    // query piece in db by work id
    dbWorkId: async (parent, { workId }) => {
      try {
        const workDbResponse = await Work.find({
          id: workId
        });
        return workDbResponse[0];
      } catch (e) {
        return e;
      }
    },
    // query pieces in db by title
    dbWorkTitle: async (parent, { title }) => {
      try {
        const workDbResponse = await Work.find({
          $or: [
            { title: new RegExp(title, 'i') },
            { subtitle: new RegExp(title, 'i') }
          ]
        });
        return workDbResponse;
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

    // manually add piece
    customWork: async (
      parent,
      { title, genre, compName, compComplete_name, epoch }
    ) => {
      // create an id for the work
      let workId =
        '9' + String(Math.floor(Math.random() * 9999)).padStart(4, '0');

      // create an id for the composer
      let compId =
        '1' + String(Math.floor(Math.random() * 999)).padStart(3, '0');

      // add work based on input
      try {
        const workResponse = await Work.create({
          id: workId,
          title: title,
          subtitle: '',
          composer: {
            id: compId,
            name: compName,
            complete_name: compComplete_name,
            epoch: epoch
          },
          genre: genre
        });
        return workResponse;
      } catch (e) {
        return e;
      }
    },

    // manually add piece with compId
    customWorkCompId: async (parent, { title, compId, genre }) => {
      // create an id for the work
      let workId =
        '9' + String(Math.floor(Math.random() * 9999)).padStart(4, '0');

      let composerData;
      try {
        // search database for composerId (just in case it's a custom id)
        const composerResponse = await Work.findOne({ 'composer.id': compId });
        if (composerResponse) composerData = composerResponse.composer;
        else {
          // search openOpus for composer data
          const openResponse = await fetch(
            `https://api.openopus.org/composer/list/ids/${compId}.json`
          );
          const data = await openResponse.json();
          composerData = data.composers[0];
        }
      } catch (e) {
        console.log(e);
      }

      // add work based on input
      try {
        const workResponse = await Work.create({
          id: workId,
          title: title,
          subtitle: '',
          composer: {
            id: compId,
            name: composerData.name,
            complete_name: composerData.complete_name,
            epoch: composerData.epoch
          },
          genre: genre
        });
        return workResponse;
      } catch (e) {
        return e;
      }
    },

    // remove piece by id
    removeWork: async (parent, { workId }) => {
      try {
        const workDbResponse = await Work.findOneAndDelete(
          { id: workId },
          { new: true }
        );
        return workDbResponse;
      } catch (e) {
        return e;
      }
    },

    editGenre: async (parent, { workId, genre }) => {
      try {
        const workDbResponse = await Work.findOneAndUpdate(
          { id: workId },
          { genre: genre },
          { new: true }
        );
        return workDbResponse;
      } catch (e) {
        return e;
      }
    }
  }
};

module.exports = resolvers;
