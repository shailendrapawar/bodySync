const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    postImg:{
        type:String
    },
    postOwner:{
        type:mongoose.Schema.ObjectId,
        ref:"authModel"
    },
    postCaption:{
        type:String,
        default:""
    },
    postHits:[{
        type:mongoose.Schema.ObjectId,
        ref:"authModel",
        default:[]
    }],
    publicUrl:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

const postModel=mongoose.model("postModel",postSchema)

module.exports=postModel