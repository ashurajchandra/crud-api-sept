const { rawListeners } = require("../Models/user");
const User = require("../Models/user");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config()


module.exports.registerUser =async(req, res)=>{
    try{
     const errors = validationResult(req);
     //if their is error ....
     console.log("errors", errors)
     if(!errors.isEmpty()){
      return res.status(400).json({
        errors:errors.array()
      })
     }

     const salt =  await bcrypt.genSalt(saltRounds);
     console.log("rpassword", req.body.password)
     const hashPassword = await bcrypt.hash(req.body.password , salt)
     if(!hashPassword){
        return res.status(400).json({
            message:'error while hashing password',
            data:[]
        })
     }
     const newUser = await User.create({name:req.body.name, email:req.body.email, password:hashPassword})
     return res.status(201).json({
         message: "user created in database ",
         data:newUser
     })
 
    }catch(error){
     console.log("error while creating user",error)
     return res.status(400).json({
         message: "error while creating user ",
         data:[]
     })
    }
 } 

 module.exports.loginUser =async(req, res)=>{
    try{
     
     //create new entry in database and return a response to client side
     const { email, password} = req.body;
    //  if( email ==='' || password ==='' ){
    //     return res.status(400).json({
    //         message:'please enter all the fields ',
    //         data:[]
    //     })
    //  }

    if( _.isEmpty(email)|| _.isEmpty(password) ){
        return res.status(400).json({
            message:'please enter all the fields ',
            data:[]
        })
     }
    //find user with registered email from db and verify password

    const user = await User.findOne({email: req.body.email})

    // user: {
    //     email:abc@gmail.com,
    //     password:123
    // }
    console.log("user",user)
    if(!user){
        return res.status(400).json({
            message:'user is not registered with us please register first',
            data:[]
        }) 
        
    }

    const verifyPassword = await bcrypt.compare(password, user.password)
    console.log("verifyPassword",verifyPassword)
    if(!verifyPassword){
        return res.status(403).json({
            message:'password is incorrect',
            data:[]
        })
    }

    const token = jwt.sign({email:user.email, name:user.name, id:user._id}, process.env.SECRET_KEY)

     return res.status(200).json({
        message:'user logined',
        data: token
     })
 
    }catch(error){
     console.log("error while creating post",error)
     return res.status(400).json({
         message: "error while creating post ",
         data:[]
     })
    }
 } 

 //forgot password
 module.exports.forgotPassword = async(req,res)=>{
    try{
        const userId = req.params.id;

     const   updatePassword =  await User.findByIdAndUpdate(userId, {$set:req})
     return res.status(200).json({
        message:'re-setting password',
        data:updatePassword._id
    })
     console.log("updatePassword",updatePassword)
    }catch(error){
        return res.status(403).json({
            message:'error occured while re-setting password',
            data:[]
        })
    }
 }