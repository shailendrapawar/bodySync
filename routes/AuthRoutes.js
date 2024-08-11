const express=require("express");
const authRouter=express.Router();
const multer=require("multer");
require("dotenv").config();


const {v4:uuidv4}=require("uuid")
const cloudinary=require("cloudinary").v2



const AuthController=require("../controllers/AuthController")

const myStorage=multer.diskStorage({
  
    destination:function(req,req,cb){
        cb(null,"./uploads")
    },  
    filename:function(req,file,cb){
        console.log(file)
        const random=uuidv4();
        cb(null,random+"-"+file.originalname);
    }
})

const upload=multer({storage:myStorage});

authRouter.post("/register",AuthController.register);
authRouter.post("/login",AuthController.login)
authRouter.post("/changePassword",AuthController.changePassword)
authRouter.post("/uploadProfileImg",upload.single("profileImg"),AuthController.uploadProfileImg);
authRouter.get("/getUser/:userId",AuthController.getUser)



module.exports=authRouter;