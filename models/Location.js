const { Schema, model } = require('mongoose');

const locationSchema = {
  name: {
    type: String,
    required: 'Enter a name for the location',
    unique: true,
    Works: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Work'
      }
    ],
    currentWorks: [{ type: Schema.Types.ObjectId, ref: 'Work' }]
  }
};

const Location = model('Location', locationSchema);

module.exports = Location;
