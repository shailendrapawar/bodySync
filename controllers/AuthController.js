const AuthModel = require("../models/AuthModels")
const bcrypt = require("bcrypt");

class AuthController {
    //============login functionlity==============================
    static login = async (req, res) => {
       
        const{email, password}=req.body;
        let isUser=await AuthModel.findOne({email:email});
        if(!isUser){
            res.send({
                msg:"user not registered",
                status:400
            })
        }else{
           
            let isValid= await bcrypt.compare(password,isUser.password);
            console.log(isValid);
            if(isValid){
                res.send({
                    msg:"authentic user",
                    status:200,
                    userId:isUser._id
                })
            }else{
                res.send({
                    msg:"wrong credentials",
                    status:400,
                    userId:null
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

            let isCreated =await  userData.save();

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
        res.send(req.body.test)
    }
}

module.exports = AuthController;