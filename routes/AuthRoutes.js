const express=require("express");
const authRouter=express.Router();

const AuthController=require("../controllers/AuthController")

authRouter.post("/register",AuthController.register);
authRouter.post("/login",AuthController.login)
authRouter.post("/changePassword",AuthController.changePassword)



module.exports=authRouter;