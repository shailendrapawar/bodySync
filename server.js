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

app.use(cors(
    {
        origin:"*"
    }
))
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("working");
})

app.use(authRouter);
app.use(postRouter)
app.listen(3000)