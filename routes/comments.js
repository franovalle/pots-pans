//Note using this repo as a guide: https://github.com/Resilient-Labs/quick-pound-2025a/blob/main/controllers/comments.js
const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

 console.log('we made it to routes')

//Post Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment);// the goal os to create claim 

//so instead of like comment i will do accept
router.put("/acceptComment/:id", commentsController.likeComment);//and accept claim 


router.put("/likeComment/:id", commentsController.likeComment);//and accept claim 

//router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;