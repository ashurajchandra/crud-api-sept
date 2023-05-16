const express = require('express');

const bodyParser = require('body-parser')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

const mongoConnect = require('./utils/database');
const postRoute = require("./Routes/post");
const authRoute = require("./Routes/user");

app.use(bodyParser.json())

app.use("/post", postRoute)
app.use("/user",authRoute)

app.use("/hello",(req, res)=>{
    res.status(200).json({
       message:"response success",
       data: "hello from json data" 
    })
 })

app.use("/", (req,res)=>{
    res.send("welcome home!!!")
})



// app.listen(port, ()=>{console.log("server is up and running on port",port)})

mongoConnect((data)=>{
//   console.log("data from main file",data)
  app.listen(port, ()=>{console.log("server is up and running on port",port)})
})



