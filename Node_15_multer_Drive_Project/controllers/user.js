const express=require('express');
const usersDataModel=require('../models/usersData');
const {builtTheToken}=require('../services/auth');

async function userSignUp(req,res){
    console.log(req.body);
    const {Name,email,password}=req.body;
    await usersDataModel.create({
        Name:Name,
        email:email,
        password:password
    })
    res.redirect("/");
}

async function userLogIn(req,res){
    const {email,password}=req.body;
    const ans=await usersDataModel.find({email,password})
    if(!ans.length){
        return res.status(400).send("No registered User...");
    }
    const token=builtTheToken(ans);
    // res.json({sessionId:token});
    res.cookie('sessionId', token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        httpOnly:true,              // Not accessible via JS (for security)
        secure: false               // Set to true if using HTTPS
    });

    res.redirect("/");
}


module.exports={
    userSignUp,
    userLogIn
}

