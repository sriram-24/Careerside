const express = require("express");

// creates an express router
const router = express.Router();

//acessing mongoose model - User
const User=require('../models/User');
const {validationResult,check}=require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require("config");
const jwt=require('jsonwebtoken');

// Register user into the mongodb database
// creates a Jsonwebtoken after sucessfully updated the data into the server
router.post('/',[

    //validation of user inputs 
    check('firstname','name is required').not().isEmpty(),
    check('lastname','lastname is required').not().isEmpty(),
    check('mobilenumber','mobilenumber is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','Enter password with atleast 6 characters or more').isLength({ min: 6 })
],async (req,res)=>{

    //get the validation results from the request
    const errors=validationResult(req);

    // check for the errors in the validation
    if(!errors.isEmpty()){

        // returns an array of errors as Json response
        return res.status(400).json({ errors: errors.array() });
    }
    // catching the json data from the body and assigning it to the variables
    const {firstname,lastname,mobilenumber,email,password,}=req.body;

    // checking for duplicate user from the database
    try {
        // check the email in the database and returns user
        let user = await User.findOne({ email });

        // if user found return user already found message as response
        // else add user details to the server
        if (user) {
            res.status(400).json({ msg: 'user already exists.' });
        }

        // creating new user with the mongoose schema and adding details 
        user=new User({
            firstname,
            lastname,
            mobilenumber,
            email,
            password
        });

        // Generate salt hash with 10 rounds
        // salt- Generates a random bytes abd combining with the password
        const salt = await bcrypt.genSalt(10);

        // hashing the password along with the salt values to secure the password
        user.password = await bcrypt.hash(password, salt);

        // save the user into the mongodb database
        await user.save();

        // payoad - The second part of the token is payload 
        // payload contains the user id created by the mongodb server 
        // create payload for the created user
        const payload = {
            User: {
                id: user._id,
            }
        };

        // creates a jsonwebtoken with payload, secretkey, expiration time 
        // config.get() - returns the secret key from the /config/default.json
        // expiresIn - stores how long token is valid for the user
        jwt.sign(payload,
            config.get('jwtSecret'), { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                else {

                    // return token to the user and store internally
                    res.json({ token });
                }
            }
        );
    } catch (err) {

        // returns error from the server
        console.error(err.message);
        res.status(500).send('server error')
    }
});

module.exports=router;