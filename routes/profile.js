const express = require("express");
const router = express.Router();
const {check,validationResult}=require('express-validator/check');
const auth=require('../middleware/Auth');
const User=require('../models/User')
const Profile=require('../models/Profile');
router.get("/me", async (req, res) => {
try{
const profiles=await Profile.find().populate('user',['firstname','lastname','mobilenumber','email']);
if(!profiles){
    return res.status(400).json({ msg: 'Profile not found' });
}
return res.json(profiles);
}catch(err){
    console.log(err)
    return res.status(500).json({ msg: 'server error' });
}
});

router.post("/updateme",[auth,[
    check('registerno','Register number is required').not().isEmpty(),
    check('dateofbirth','Date of birth is required').not().isEmpty(),
    check('department','department is required').not().isEmpty(),
    check('section','section is required').not().isEmpty()
]], async(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const {
        registerno,
        dateofbirth,
        department,
        section,
        sslc,
        sslcpassedyear,
        sslcpercentage,
        hsc,
        hscpassedyear,
        hscpercentage,
        degree,
        degreepassedyear,
        degreepercentage,
        skills,
        bio,
        projects
    }=req.body;
    const profileFields={};
    profileFields.user=req.user.id;
    if(registerno) profileFields.registerno=registerno;
    if(dateofbirth) profileFields.dateofbirth=dateofbirth;
    if(department) profileFields.department=department;
    if(section) profileFields.section=section;
    if(skills){
        profileFields.skills=skills.split(',').map((skill)=>' '+skill.trim())
    };
    if(bio) profileFields.bio=bio;
    if(projects) profileFields.projects=projects;

    profileFields.academicdetails={};
    if(sslc) profileFields.academicdetails.sslc=sslc;
    if(sslcpassedyear) profileFields.academicdetails.sslcpassedyear=sslcpassedyear;
    if(sslcpercentage) profileFields.academicdetails.sslcpercentage=sslcpercentage;
    if(hsc) profileFields.academicdetails.hsc=hsc;
    if(hscpassedyear) profileFields.academicdetails.hscpassedyear=hscpassedyear;
    if(hscpercentage) profileFields.academicdetails.hscpercentage=hscpercentage;



    if(degree) profileFields.academicdetails.degree=degree;
    if(degreepassedyear) profileFields.academicdetails.degreepassedyear=degreepassedyear;
    if(degreepercentage) profileFields.academicdetails.degreepercentage=degreepercentage;
    console.log(profileFields)
    try {
        let profile=await Profile.findOneAndUpdate(
            {user:req.user.id},
            {$set:profileFields},
            {new:true,upsert:true}
        );
        res.json(profile)
    } catch (err) {
        return res.status(500).json({ msg: 'Server error' });
    }
});


module.exports=router;