const express = require("express");
const Quiz=require('../models/Quiz');
const router=express.Router();
router.get("/", async(req, res) => {
  try {
      const quiz=await Quiz.find({tag:'games'});
      if(!quiz){
          return res.status(400).json({msg:"quiz not found"});
      }
      return res.json(quiz);
  } catch (err) {
      console.log(err);
      return res.status(500).json({msg:"Internal server Error"});
  }
});
module.exports=router;