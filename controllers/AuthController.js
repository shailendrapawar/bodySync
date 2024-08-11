const AuthModel = require("../models/AuthModels")
const bcrypt = require("bcrypt");
const fs = require("fs")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
class AuthController {

    //============login functionlity==============================
    static login = async (req, res) => {

        const { email, password } = req.body;
        let isUser = await AuthModel.findOne({ email: email });
        if (!isUser) {
            res.send({
                msg: "user not registered",
                status: 400
            })
        } else {
            let isValid = await bcrypt.compare(password, isUser.password);
            console.log(isValid);
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

    //============upload image====================

    static uploadProfileImg = async (req, res) => {
        const filePath = req.file.path;
        const{userId}=req.body;

        const isUploaded = await cloudinary.uploader.upload(filePath);
        if (isUploaded) {
            const { secure_url, public_id } = isUploaded;
            await fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("error in deleting file from server");
                } else {
                    console.log("file deleted from server");
                }
            })

            const isUpdated=await AuthModel.findByIdAndUpdate({_id:userId},{
                $set:{
                    profileImg:secure_url,
                    publicUrl:public_id
                }
            })

            if(isUpdated){
                res.send({
                    msg: "profile image uploaded successfully",
                    status: 200
                })
            }else{
                res.send({
                    msg:"profile pic not uploaded",
                    status:400
                })
            }
        }else{
            res.send({
                msg:"profile pic not uploaded",
                status:400
            })
        }
    }
}

module.exports = AuthController;