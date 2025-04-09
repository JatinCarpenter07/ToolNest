const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const {nanoid}=require('nanoid')
const filesDataModel=require('../models/filesData');

async function uploadTheFile(req,res){
    console.log(`provideShortUrl Running`)
    console.log("THe User is : ",req.user);
    if(!req.files || !req.files.length){
        return res.status(400).json({error: "Must provide Files..."})
    }
    req.files.forEach(async(file) => {
        const fileId=nanoid(10);
        await filesDataModel.create({
            fileId:fileId,
            Name:file.originalname,
            address:file.path,
            createdBy:req.user._id 
        });
    });
    res.redirect("/");
}

async function downloadTheFile(req,res){
    const fileId=req.params.address;
    let address=await filesDataModel.find({fileId});
    if(!address.length)
        return res.json({message:"No file Found..."});
    address=address[0].address;
    res.download(path.join(__dirname,"..", address));
}

async function deleteTheFile(req,res){
    const fileId=req.params.address;
    let address=await filesDataModel.find({fileId});
    if(!address.length)
        return res.json({message:"No file Found..."});
    address=address[0].address;
    await filesDataModel.deleteOne({fileId});
    fs.unlink(path.join(__dirname,"..",address),(error)=>{});
    res.redirect('/');
}

module.exports={uploadTheFile,downloadTheFile,deleteTheFile};
