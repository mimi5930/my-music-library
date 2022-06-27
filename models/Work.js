const { Schema, model } = require('mongoose');

const workSchema = new Schema({
  id: String,
  composer: {
    id: String,
    name: String,
    epoch: String,
    birth: String,
    death: String,
    complete_name: String,
    portrait: String
  },
  title: String,
  subtitle: String,
  genre: String,
  added: {
    type: Date,
    default: Date.now
  }
});

const Work = model('Work', workSchema);

module.exports = Work;
