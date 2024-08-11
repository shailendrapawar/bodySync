

class AuthController{
    static login=async(req,res)=>{
        res.send(req.body.test)    }
    static register=async(req,res)=>{
        res.send(req.body.test)    }

    static changePassword=async(req,res)=>{
        res.send(req.body.test)    }
}

module.exports=AuthController;