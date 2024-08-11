const express=require("express");
const postRouter=express.Router();

const PostController=require("../controllers/PostController")

postRouter.post("/createPost",PostController.creatPost);
postRouter.post("/deletePost",PostController.deletePost);
postRouter.get("/getPost",PostController.getPost);
postRouter.get("/getAllPost",PostController.getAllPost);



module.exports=postRouter;