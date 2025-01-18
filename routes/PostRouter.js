const express=require("express");
const postRouter=express.Router();
const multer=require("multer");
require("dotenv").config();

const PostController=require("../controllers/PostController")

const {v4:uuidv4}=require("uuid")


const myStorage=multer.diskStorage({
  
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },  
    filename:function(req,file,cb){
        const random=uuidv4();
        cb(null,random+"-"+file.originalname);
    }
})

const upload=multer({storage:myStorage});

postRouter.post("/createPost",upload.single("postImg"),PostController.creatPost);
postRouter.post("/deletePost/:postId",PostController.deletePost);
postRouter.get("/getPost/:postId",PostController.getPost);
postRouter.get("/getAllPosts",PostController.getAllPost);


module.exports=postRouter;