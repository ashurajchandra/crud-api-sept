const Post = require("../Models/post");

//create
module.exports.createPost =async(req, res)=>{
   try{
    
    //create new entry in database and return a response to client side
    console.log("req.body", req.body)
    console.log("current logined user id",req.body.userId)
    console.log("Post model", Post)
    const newPost = await Post.create({title:req.body.title, imageUrl:req.body.imageUrl, desc:req.body.desc, userId:req.body.userId})
    console.log("newPost",newPost)
    return res.status(201).json({
        message: "post created in database ",
        data:newPost
    })

   }catch(error){
    console.log("error while creating post",error)
    return res.status(400).json({
        message: "error while creating post ",
        data:[]
    })
   }
} 
//update


//get
module.exports.getPosts = async(req, res)=>{
    try{
        const getPosts = await Post.find({}).populate('userId').exec()
        console.log("getPosts",getPosts)

        return res.status(200).json({
            msg:"posts fetched",
            data:getPosts
        })

    }catch(error){
        console.log("error while fetching posts",error)
        return res.status(400).json({
            message: "error while fetching posts ",
            data:[]
        })
    }
}


//delete method

module.exports.deletePost = async(req, res)=>{
    try{
         console.log("params data", req.params)
         const id =  req.params.id

         const deletePost = await Post.findByIdAndDelete(id)
         if(deletePost){
            return res.status(200).json({
                msg:"post deleted successfully",
                data: deletePost._id
            })
         }

    }catch(error){
        console.log("error while deleting post",error)
        return res.status(400).json({
            message: "error while deleting post ",
            data:[]
        })
    }
}

module.exports.editPost = async(req, res)=>{
try{
    const id = req.params.id;
    const updatePost = await Post.findByIdAndUpdate(id, {$set:req.body})
    console.log("updatePost",updatePost)
    return res.status(200).json({
        message:"post updated",
        data: updatePost._id
    })

}catch(error){
    console.log("error while editing post",error)
    return res.status(400).json({
        message: "error while editing post ",
        data:[]
    })
}
}