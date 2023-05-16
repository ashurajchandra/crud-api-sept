

const express = require('express');

const postController = require("../Controllers/post")

const authUser = require('../security/verifyToken')

// const {Router} = express;

const router = express.Router();



router.post("/create-post",authUser.verifyToken, postController.createPost)
router.get("/get-posts", postController.getPosts)

router.delete("/delete-post/:id", postController.deletePost)
router.put('/edit-post/:id', postController.editPost)

module.exports = router;