const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require("config");
const auth = require('../middleware/Auth');
const User = require('../models/User');
router.get("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        console.log(user)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
});

router.post("/",[
    check('email','email is required').isEmail(),
    check('password','password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password' }] });
        }

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
        res.status(500).send('server error');
    }
});
module.exports=router;