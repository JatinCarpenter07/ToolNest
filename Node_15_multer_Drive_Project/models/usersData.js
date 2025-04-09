const mongoose=require('mongoose');

const usersDataSchemma=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    }
},{
    timestamps:true,
    strict:false
},)

const usersDataModel=mongoose.model("users",usersDataSchemma,"usersData");

module.exports=usersDataModel;