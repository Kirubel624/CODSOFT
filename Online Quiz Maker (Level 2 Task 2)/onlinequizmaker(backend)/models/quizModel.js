const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: {type:String ,required:true},
  title: {type:String ,required:true},
  description: {type:String ,required:true},
  author: {type:String ,required:true},
  authorID: {type:String ,required:true},

  questions: [
    { shortID:{type:String},
      questionText: {type:String ,required:true},
      options: [{type:String}],
      correctAnswer: {type:String ,required:true},
    },
  ],
  userScores: [
    {
      userID: { type: String},
      score: Number,
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
