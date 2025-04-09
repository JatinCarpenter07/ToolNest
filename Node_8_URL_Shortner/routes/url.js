const express=require('express');
const urlRouter=express.Router();
const {
    provideShortUrl,
    provideNoOfCounts
}=require('../controllers/url')

urlRouter.post('/',provideShortUrl);
urlRouter.get('/analytics/:ID',provideNoOfCounts);


module.exports=urlRouter;