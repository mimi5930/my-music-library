const { Schema, model } = require('mongoose');

const workSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  subtitle: String,
  composer: {
    id: String,
    name: String,
    complete_name: String,
    epoch: String
  },
  genre: String,
  added: {
    type: Date,
    default: Date.now
  }
});

const Work = model('Work', workSchema);

module.exports = Work;
