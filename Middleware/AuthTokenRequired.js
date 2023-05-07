const jwt =require('jsonwebtoken');
const mongoose =require('mongoose');

const User =mongoose.model("User");
require('dotenv').config();
module.exports =(req, res, next)=>{
    const { authorization } =req.headers;
    if(!authorization){
        return res.status(401).send({error :"you must be logged in , key not given"});
    }
    const  token =authorization.replace("bearer ","");
    jwt.verify(token,process.env.JWT_SECRET, async (err,payload)=>{
        if(err){
            return res.status(401).json({error :"you must be logged ,token invalid"});
        }
        const {id} =payload;
        console.log('id :'+id);
        User.findById(id).then(userdata =>{
            req.user =userdata;
            next();
        })
    })
    
}