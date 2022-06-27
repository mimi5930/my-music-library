const { Schema, model } = require('mongoose');

const borrowedSchema = new Schema({
  name: {
    type: String,
    required: 'Who was this piece borrowed to?'
  },
  email: {
    type: String,
    required: 'Enter an email address',
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  borrowed_out: {
    type: Date,
    default: Date.now
  },
  works: [{ type: Schema.Types.ObjectId, ref: 'Work' }]
});

const BorrowedWorks = model('BorrowedWorks', borrowedSchema);

module.exports = BorrowedWorks;
