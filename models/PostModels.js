const mongoose=require("mongoose");

const postModel=new mongoose.Schema({
    postImg:{
        type:String
    },
    postCaption:{
        type:String,
        default:""
    },
    postHits:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})