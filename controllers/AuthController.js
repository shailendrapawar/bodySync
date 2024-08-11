const AuthModel = require("../models/AuthModels")
const bcrypt = require("bcrypt");

class AuthController {
    static login = async (req, res) => {
        res.send(req.body.test)
    }
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