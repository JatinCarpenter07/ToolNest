const express=require('express');
const fileRouter=express.Router();
const { uploadTheFile,downloadTheFile,deleteTheFile}=require('../controllers/file')

fileRouter.post('/',uploadTheFile);
fileRouter.get('/delete/:address',deleteTheFile);
fileRouter.get('/:address',downloadTheFile);

module.exports=fileRouter;