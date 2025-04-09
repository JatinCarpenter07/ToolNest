const {nanoid}=require('nanoid')
const urlDataModel=require('../models/urlData');

async function provideShortUrl(req,res){
    const shortId=nanoid(5);
    if(!req.body.originalUrl){  
        res.status(400).json({error: "Must provide the Original url..."})
    }
    await urlDataModel.create({
        urlId:shortId,
        originalUrl:req.body.originalUrl,
        visitHistory:[{counts:0}] 
    });
    const ipAddress="192.168.1.18";
    return res.json({id:shortId,
        newUrl:`http://${ipAddress}:5600/${shortId}`,
        countUrl:`http://${ipAddress}:5600/url/analytics/${shortId}`
    });
}

async function provideNoOfCounts(req,res){
    const id=req.params.ID;
    console.log("inside the provide no of counts");
    const counts=await urlDataModel.find({urlId:id},{visitHistory:1,_id:0});
    if(!counts.length){
        return res.status(400).json({message: "No Corresponding Original Url Registered.."})
    }
    console.log(counts)
    res.json({Counts : counts[0].visitHistory[0].counts})
}


module.exports={provideShortUrl,provideNoOfCounts};
