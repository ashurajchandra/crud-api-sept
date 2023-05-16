const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const postSchema = new Schema({
    title:{
       type:String,
       required:true 
    },
    imageUrl:{
        type:String
    },
    desc:{
        type:String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    }
},{timestamps:true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;