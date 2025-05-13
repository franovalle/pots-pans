//Note using repo https://github.com/100devs/binary-upload-boom/blob/main/views/feed.ejs and repo https://github.com/Resilient-Labs/quick-pound-2025a/blob/main/routes/comments.js as a guide

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);//this is when the order form is filed out 

router.put("/likePost/:id", postsController.likePost);

//router.put("/editPost/:id", postsController.editPost); 

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
