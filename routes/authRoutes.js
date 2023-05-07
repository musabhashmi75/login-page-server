const express =require('express');
const router =express.Router();
const mongoose =require('mongoose');
const jwt =require('jsonwebtoken');
require('dotenv').config();
const User =mongoose.model("User");

router.post('/signup',(req,res) =>{
    console.log(req.body);
    // res.send('This is signup page')
    const{first_name ,last_name ,phone ,dob ,email ,password ,re_password} =req.body
    if(password != re_password){
        return res.status(422).send({error :"Passwords don't match"});
    }

    User.findOne({email:email}).then(
        async(savedUser) =>{
            if(savedUser){ 
                return res.status(422).send({error: "Invalid Credentials"});
            }
            const user =new User({
                first_name,
                last_name,
                phone,
                dob,
                email,
                password,
                re_password
            })
            try{
                await user.save();
                // res.send({message :"user saved successfully"});
                const token =jwt.sign({id :user._id},process.env.JWT_SECRET);
                res.send({token});
            }
            catch(err){
                console.log('db err',err);
                res.status(422).send({error: err.message})
            }
        }
    )
})

module.exports =router;