class PostController{
    static creatPost=async(req,res)=>{
        res.send(req.body.test)
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