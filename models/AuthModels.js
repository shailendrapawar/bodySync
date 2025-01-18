const mongoose=require("mongoose");
const authSchema=new mongoose.Schema({
    name:{
        type:String, 
    },
    email:{
        type:String
    },
    bio:{

    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    profileImg:{
        type:String,
        default:null
    },
    publicUrl:{
        type:String,
        default:null
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