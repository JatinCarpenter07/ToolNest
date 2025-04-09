const mongoose=require('mongoose');

function connectTheDB(url){
    mongoose.connect(url)
    .then(()=>{
        console.log("DB connected...");        
    })
    .catch((error)=>{
        console.log(`Error : ${error}`);
    });
}

module.exports=connectTheDB;

