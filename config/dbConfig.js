const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = async () => {
    try {
        const dbRes = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        if (dbRes) {
            console.log("DB conncted");
        } else {
            console.log("connection error")
        }
    }catch(err){
        console.log("errror:"+err);
    }

}

module.exports=dbConnect;