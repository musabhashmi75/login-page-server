const mongoose =require('mongoose');
const bcrypt =require('bcrypt');
const userSchema =new mongoose.Schema({
    first_name :{
        type :String
    },
    last_name :{
        type :String
    },
    phone :{
        type :String
    },
    dob :{
        type :String
    },
    email :{
        type :String,
        unique :true

    },
    password :{
        type :String

    },
    re_password :{
        type :String
    }
})

userSchema.pre('save', async function(next){
    const user =this;
    console.log('Password before :' +user.password);
    if(!user.isModified('password')){
        return next();
    }
    user.password =await bcrypt.hash(user.password, 8);
    console.log('Password after :'+user.password);
})

mongoose.model("User",userSchema);