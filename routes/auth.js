const router= require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post("/register",async(req,res)=>{
    const hashedpassword = bcrypt.hashSync(req.body.password)

    const newUser = new User({
        username:req.body.username, 
        email:req.body.email,
        password:hashedpassword,
    })

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }

})


router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        const correctpassword = bcrypt.compareSync(req.body.password,user.password)

        if(correctpassword){
            
            const accessToken = jwt.sign(
                {
                    id:user._id,
                    isAdmin:user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
            );

            return res.status(200).json({ user , accessToken})

        }
        return res.status(500).json({message:"user not found"})
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;