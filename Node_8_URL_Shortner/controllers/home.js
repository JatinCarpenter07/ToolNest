const urlDataModel=require('../models/urlData');

async function redirectToOriginalUrl(req,res){
    const id=req.params.ID;
    const originalUrl=await urlDataModel.find({urlId:id},{originalUrl:1,_id:0});
    if(!originalUrl.length){
        return res.status(400).json({message: "No Corresponding Original Url Registered.."})
    }
    await urlDataModel.updateOne({urlId:id},{$inc:{"visitHistory.0.counts":+1}})
    res.redirect(301, originalUrl[0].originalUrl);
}

module.exports=redirectToOriginalUrl;
