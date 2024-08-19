const AuthModel = require("../models/AuthModels")
const bcrypt = require("bcrypt");
const fs = require("fs");
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
class AuthControllers {


    //============get  user info=================================
    static getUser = async (req, res) => {
        const { userId } = req.params;

        const user = await AuthModel.findById({ _id: userId }).populate("posts");


        if (user) {
            res.send({
                msg: "user data found",
                status: 200,
                userData: user
            })
        } else {
            res.send({
                msg: "user data not found",
                status: 400,
                userData: null
            })
        }

    }

    //============login functionlity==============================
    static login = async (req, res) => {

        const{email,password}=req.body;
        
        let isUser = await AuthModel.findOne({ email: email });
        if (!isUser) {
            res.send({
                msg: "user not registered",
                status: 400
            })
        } else {
            let isValid = await bcrypt.compare(password, isUser.password);
            
            if (isValid) {
                res.send({
                    msg: "authentic user",
                    status: 200,
                    userId: isUser._id
                })
            } else {
                res.send({
                    msg: "wrong credentials",
                    status: 400,
                    userId: null
                })
            }
        }
    }


    //============register functionality===========================
    static register = async (req, res) => {
        const { name, email, password, gender } = req.body;

        let isExist = await AuthModel.findOne({ email, email }).select("password");

        if (isExist) {
            res.send({
                status: 400,
                msg: "user already exist"
            })
        } else {
            let salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            let userData = new AuthModel({
                name: name,
                email: email,
                password: hashPass,
                gender: gender
            })

            let isCreated = await userData.save();

            if (isCreated) {
                res.send({
                    msg: "user created",
                    status: 201
                })
            } else {
                res.send({
                    msg: "user not created",
                    status: 400
                })
            }

        }

    }

    static changePassword = async (req, res) => {

    }


    //============upload profile image====================

    static uploadProfileImg = async (req, res) => {
        const filePath = req.file.path;
        const { userId } = req.body;

        //first check if any image is there or not===============================

        const user = await AuthModel.findById({ _id: userId })
        const isNull = user.profileImg == null;
      

        if (!isNull) {
            let cloudDelete = await cloudinary.uploader.destroy(user.publicUrl);
        }


        const cloudUpload = await cloudinary.uploader.upload(filePath)
       
        if (cloudUpload) {
            const isUpdated = await AuthModel.findByIdAndUpdate({ _id: userId }, {
                $set: {
                    profileImg: cloudUpload.secure_url,
                    publicUrl: cloudUpload.public_id
                }
            })

            if (isUpdated) {
                await fs.unlinkSync(filePath);

                res.send({
                    msg: "uploaded successfully",
                    status: 200
                })
            }
        } else {
            res.send({
                msg: "error in uploading profile img",
                status: 400
            })
        }
    }

    //fucnrtion for removing profile pic====================

    static deleteProfileImg = async (req, res) => {
        const { userId } = req.body;

        const user = await AuthModel.findById({ _id: userId })

        if (user) {
            const isNull = user.profileImg == null;
            

            if (!isNull) {
                let cloudDelete = await cloudinary.uploader.destroy(user.publicUrl);
            }
            const isUpdated = await AuthModel.findByIdAndUpdate({ _id: userId }, {
                $set: {
                    profileImg: null,
                    publicUrl: null
                }
            })

            if (isUpdated) {
                res.send({
                    msg: "profile img deleted",
                    status: 200
                })
            } else {
                res.send({
                    msg: "profile img deleted",
                    status: 200
                })
            }

        }else{
             res.send({
            msg: "user not found",
            status: 400
        })

        }
    }
}

module.exports=AuthControllers