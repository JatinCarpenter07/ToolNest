const mongoose=require('mongoose');

const filesDataSchema=new mongoose.Schema({
    fileId:{
        type: String,
        required:true,
        unique:true
    },
    Name:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usersData",
        required:true
    }
},
{
    timestamps:true,
    strict:false
}
);

const filesDataModel=mongoose.model("filesData",filesDataSchema,"filesData");

module.exports=filesDataModel;