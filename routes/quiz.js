const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
router.post(
  '/',
  async (req, res) => {
    const { quest, option, correct,tag } = req.body;

    try {
      quiz = new Quiz({
        quest,
        option,
        correct,
        tag
      });
      console.log(quiz);
      await quiz.save();
      res.send("data added sucessfully");
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;