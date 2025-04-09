const express=require('express');
const userRouter=express.Router();
const {userSignUp,userLogIn}=require('../controllers/user')

userRouter.post('/signup', userSignUp);
userRouter.post('/login', userLogIn);


module.exports=userRouter;