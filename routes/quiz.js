const express = require('express');
const {validationResult,check}=require('express-validator/check')
const router = express.Router();
const Quiz = require('../models/Quiz');
router.post('/',[
    check('question','Enter a valid question').not().isEmpty(),
    check('options','Enter options').not().isEmpty(),
    check('correct','Enter a valid answer').not().isEmpty()
  ],
  async (req, res) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { question, options, correct,tag } = req.body;
    try {
      quiz = new Quiz({
        question,
        options,
        correct,
        tag
      });
      //console.log(quiz);
      await quiz.save();
      res.send("data added sucessfully");
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;