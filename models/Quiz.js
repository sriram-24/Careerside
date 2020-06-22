const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
  quest: {
    type: String,
  },
  option: {
    type: String, 
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