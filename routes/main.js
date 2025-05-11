//Note using repo https://github.com/100devs/binary-upload-boom/blob/main/views/feed.ejs and repo https://github.com/Resilient-Labs/quick-pound-2025a/blob/main/routes/comments.js as a guide

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);//this is the rest route
router.get("/feed", ensureAuth, postsController.getFeed);//both rest and hospital can see this route
router.get("/login", authController.getLogin);//both rest and hospital can see this route
router.post("/login", authController.postLogin);//both rest and hospital can see this route
router.get("/logout", authController.logout);//both rest and hospital can see this route
router.get("/signup", authController.getSignup);//both rest and hospital can see this route
router.post("/signup", authController.postSignup);//both rest and hospital can see this route
//i think i need to make one more route-->where it brings the hospital to see claimed
//router.get("/profileOrg", ensureAuth, postsController.getProfileOrg)
module.exports = router;