const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  options: {
    type: Array, 
  },
  correct: {
    type: String,
  },
  tag: {
    type: String,
    
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Quiz = mongoose.model('quiz', QuizSchema,'quiz');