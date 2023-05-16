//mongodb+srv://mukutrai12:<password>@cluster0.f3d1jmd.mongodb.net/test
// const mongodb = require("mongodb");

const mongoose = require('mongoose');


require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL;
// const MongoClient = mongoose.MongoClient;

const mongoConnect = (callback) => {
    console.log("inside db")
    mongoose.connect(MONGO_URI)
    .then((data) => {
      console.log("database connected");
      callback(data);
    })
    .catch((error) => {
      console.log("error in setting up connection with database", error);
    });
};

module.exports = mongoConnect