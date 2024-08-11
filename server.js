const express=require("express")
const app=express()
const cors=require("cors");
require("dotenv").config();

//db connection---------------
const dbConnect=require("./config/dbConfig")
dbConnect();

app.use(cors(
    {
        origin:"*"
    }
))


app.get("/",(req,res)=>{
    res.send("working");
})

app.listen(3000)