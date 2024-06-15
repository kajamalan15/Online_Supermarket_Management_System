//LOAD ENV VARIABLES
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectToDb()
{
    try{
        await mongoose.connect(process.env.Db_URL)
        console.log("connected to Database");
    }catch(err){
    console.log(err);
}
}

module.exports = connectToDb;