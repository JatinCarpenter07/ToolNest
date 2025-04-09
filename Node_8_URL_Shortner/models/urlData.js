const mongoose=require('mongoose');

const urlDataSchema=new mongoose.Schema({
    urlId:{
        type: String,
        required:true,
        unique:true
    },
    originalUrl:{
        type: String,
        required:true
    },
    visitHistory:[{counts:{type:Number}}]
},
{
    timestamps:true
}
);

const urlDataModel=mongoose.model("urlData",urlDataSchema,"urlData");

module.exports=urlDataModel;