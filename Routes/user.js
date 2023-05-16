
const { body, validationResult } = require('express-validator');

const express = require('express');

const userController = require("../Controllers/user")

// const {Router} = express;

const router = express.Router();

//

router.post("/register",
body('email', "please enter email correctly").notEmpty().isEmail(),
body('password', 'please do not provide common password').not().isIn(['123', 'password', 'god']).isLength({min:3}).withMessage("password is less than 8 charcter"),
body('confirmPassword').custom((value, {req})=>{
     if(value !== req.body.password){
         throw new Error('password and confirm password do not matches')
     }
     return value

})
,userController.registerUser)
router.post("/login", userController.loginUser)


module.exports = router;