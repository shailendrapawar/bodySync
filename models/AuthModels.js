const mongoose=require("mongoose");

const authSchema=new mongoose.Schema({
    name:{
        type:String, 
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    profileImg:{
        type:String,
        default:""
    },
    totalHits:{
        type:Number,
        default:0
    },
    posts:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"postModel"
        }
    ]
},{
    timestamps:true
})

const authModel=mongoose.model("authModel",authSchema);

module.exports=authModel;