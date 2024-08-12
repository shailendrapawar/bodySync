const PostModel = require("../models/PostModels")
const AuthModel = require("../models/AuthModels")
const bcrypt = require("bcrypt");
const fs = require("fs");
const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


class PostController {

    //========creating post=============================
    static creatPost = async (req, res) => {
        const { userId, postCaption } = req.body;
        const filePath = req.file.path;

        const isUploaded = await cloudinary.uploader.upload(filePath)
        if (isUploaded) {
            fs.unlinkSync(filePath);

            let newPost = new PostModel({
                postCaption: postCaption,
                postImg: isUploaded.secure_url,
                publicUrl: isUploaded.public_id
            })

            const isCreated = await newPost.save();

            if (isCreated) {
                const isPushed = await AuthModel.findByIdAndUpdate({ _id: userId }, {
                    $push: {
                        posts: isCreated._id
                    }
                })

                if (isPushed) {
                    res.send({
                        msg: "post created",
                        status: 201
                    })
                }
            }

        } else {
            res.send({
                msg: "post image not uploaded",
                status: 400
            })
        }

    }

    //========Deleting post===================================
    static deletePost = async (req, res) => {

        const { userId } = req.body;
        const { postId } = req.params;

        const isDeleted = await PostModel.findByIdAndDelete({ _id: postId });
        if (isDeleted) {
            const isPoped = await AuthModel.findByIdAndUpdate({ _id: userId }, {
                $pull: {
                    posts: postId
                }
            })

            const cloudDeleted=await cloudinary.uploader.destroy(isDeleted.publicUrl,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(result)
                }

            })
        
            const result=await Promise.all([cloudDeleted,isPoped]);

            if(result){
                res.send({
                    msg: "post deleted ",
                    status: 200
                })
            }else{
                res.send({
                    msg: "post not deleted ",
                    status: 400
                })
            }
        } else{
            res.send({
                msg: "post not deleted ",
                status: 400
            })
        }

    }

    static getPost = async (req, res) => {
        const { postId } = req.params

        let isPost = await PostModel.findById({ _id: postId });
        if (isPost) {
            res.send({
                status: 200,
                msg: "post found",
                data: isPost
            })
        } else {
            res.send({
                status: 400,
                msg: "post not found",
                data: null
            })
        }
    }

    static getAllPost = async (req, res) => {
        let allPosts = await PostModel.find({})
        if (allPosts) {
            res.send({
                status: 200,
                msg: "post found",
                data: allPosts
            })
        } else {
            res.send({
                status: 400,
                msg: "post not found",
                data: null
            })
        }
    }


}

module.exports = PostController