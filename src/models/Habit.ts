const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const squareSchema = new Schema({
    id: Number,
    date: Date,
    completed: Boolean,
    val: Number
});

const habitSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['NUMBER', 'CHECKBOX'],
      required: true
    },
    metric: String,
    squares: [squareSchema]
  });

  const Habit = mongoose.model('Habit', habitSchema);

  module.exports = Habit;
  