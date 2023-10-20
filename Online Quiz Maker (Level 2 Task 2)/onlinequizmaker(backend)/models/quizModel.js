const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  author: String,
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  userScores: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: Number,
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
