const faker = require('@faker-js/faker');
const works = require('./works.json');
const db = require('../config/connection');
const { Work, Location, BorrowedWorks } = require('../models');

db.once('open', async () => {
  // delete data
  await Work.deleteMany();
  await Location.deleteMany();
  await BorrowedWorks.deleteMany();

  console.log('Deleted existing db data');

  // insert various works
  const worksData = await Work.insertMany(works);

  console.log('Created Works');

  // get a list of genres for location names
  let genres = [];
  worksData.forEach(work => {
    if (genres.filter(key => key.name === work.genre).length === 0)
      genres.push({ name: work.genre });
  });

  // create locations based on genres
  await Location.insertMany(genres);

  console.log('Created Locations');

  // insert works into their respective locations
  for await (const work of worksData) {
    await Location.findOneAndUpdate(
      { name: work.genre },
      {
        $push: { works: work._id }
      }
    );

    await Location.findOneAndUpdate(
      { name: work.genre },
      {
        $push: { currentWorks: work._id }
      }
    );
  }

  console.log('Inserted music into their locations');

  process.exit(0);
});
