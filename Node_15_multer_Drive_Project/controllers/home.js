const filesDataModel=require('../models/filesData');

async function provideTheHomePage(req,res){
    console.log("come inside of provideTheHomePage")
    console.log("here req.user:",req.user)
    if(req.user){
        const allFiles=await filesDataModel.find({createdBy:req.user._id});
        console.log("USER : ",req.user);
        // console.log("AllUrls : ",allUrls);
        console.log("send the allurls");
        return res.render("home",{allFiles:allFiles,
            user:req.user
        });
    }
    res.render("home");
}

async function provideTheHomeAllAccess(req,res){
    console.log("come inside of provideTheHomePage")
    console.log("here req.user:",req.user)
    if(req.user){
        const allFiles=await filesDataModel.find({});
        console.log("USER : ",req.user);
        // console.log("AllUrls : ",allUrls);
        console.log("send the allurls");
        return res.render("home",{allFiles:allFiles,
            user:req.user
        });
    }
    res.render("home");
}
module.exports={provideTheHomePage,provideTheHomeAllAccess}
