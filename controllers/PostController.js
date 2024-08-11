const PostModel=require("../models/PostModels")

class PostController{
    static creatPost=async(req,res)=>{
        const{userId,postCaption}=req.body;

        let newPost=new PostModel({
            postCaption:postCaption,
            postHits:12,
            postImg:"sample usrl"
        })

        let isCreated=newPost.save();
        if(isCreated){
            res.send({
                msg:"post created",
                status:200,
                
            })
        }else{
            res.send({
                msg:"post not created",
                status:400,
                
            })
        }
    
    }
    static deletePost=async(req,res)=>{
        res.send(req.body.test)    }

    static getPost=async(req,res)=>{
        res.send(req.body.test)
    }

    static getAllPost=async(req,res)=>{
        res.send(req.body.test)
    }
}

module.exports=PostController