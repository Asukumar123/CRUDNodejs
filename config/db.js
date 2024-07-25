const mongoose=require('mongoose')
require('dotenv').config();

const mongoURL=process.env.DB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true, useUnifiedTopology:true
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connected to mongodb server");
})
db.on('error',(err)=>{
    console.log("Mongodb Connection error");
})
db.on('disconnected',()=>{
    console.log("Mongodb disconnected");
})

module.exports=db;

