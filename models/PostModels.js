const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
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
    },
    publicUrl:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const postModel=mongoose.model("postModel",postSchema)

module.exports=postModel