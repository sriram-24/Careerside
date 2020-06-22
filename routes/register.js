const express = require("express");
const router = express.Router();
const User=require('../models/User');
const {validationResult,check}=require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt=require('jsonwebtoken');
router.post('/',[
    check('firstname','name is required').not().isEmpty(),
    check('lastname','lastname is required').not().isEmpty(),
    check('mobilenumber','mobilenumber is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','Enter password with atleast 6 characters or more').isLength({ min: 6 })
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {firstname,lastname,mobilenumber,email,password,}=req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'user already exists.' });
        }
        user=new User({
            firstname,
            lastname,
            mobilenumber,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            User: {
                id: user._id,

            }
        };
        jwt.sign(payload,
            config.get('jwtSecret'), { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                else {
                    res.json({ token });
                }
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});
module.exports=router