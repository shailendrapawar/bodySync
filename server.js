const express=require("express")
const app=express()
const cors=require("cors");
require("dotenv").config();





//db connection---------------
const dbConnect=require("./config/dbConfig")
dbConnect();

//importing routes--------------
const authRouter=require("./routes/AuthRoutes")
const postRouter=require("./routes/PostRouter")

//import postmodel for reltime like unlike===============
const PostModel=require("./models/PostModels")
const {Server} =require("socket.io")
const{createServer} =require("http");
const myServer=createServer(app)
const io=new Server(myServer,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"],
        credentials: true // Allow cookies to be sent
    }
});



app.use(cors({
    origin: "*", // Replace with your frontend URL
   
}))





app.get("/",(req,res)=>{
    res.send("working");
})

app.use(express.json())
app.use(authRouter)
app.use(postRouter)




io.on("connection",(socket)=>{
    
    socket.on("handleLike",async (data)=>{
       
        
        if(data.value==false){
          let isPushed =await  PostModel.findByIdAndUpdate({_id:data.postId},{
                $push:{
                    postHits:data.userId
                }
            })
            if(isPushed){
                io.emit("changes",true)
            }

          
        }else{
           let isPulled=await  PostModel.findByIdAndUpdate({_id:data.postId},{
                $pull:{
                    postHits:data.userId
                }
            })
            if(isPulled){
                io.emit("changes",true)
            }
           
        }
    })

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })

})
myServer.listen(3000)

// ========================================================