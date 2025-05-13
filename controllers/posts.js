//Note: Used https://stackoverflow.com/questions/53517891/user-roles-and-permission-based-access-in-node-js as a guide and resource & https://stackoverflow.com/questions/70743686/where-is-req-user-coming-from-in-this-node-and-express-lines-of-codes

const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");


module.exports = {
  getProfile: async (req, res) => {
    try {
     

      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();// this will sort the donations in descending order
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({createdAt: -1}).lean();
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        org: req.body.org,
        item: req.body.item,
        description: req.body.item,
        note: req.body.note,
        deliveryDate: req.body.deliveryDate,
        deliveryTime: req.body.deliveryTime,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      //only the restaurant should be able to delete; 
     /* if (post.user !== req.user.id) { // makes sure only the restaurant can delete
        return res.redirect("/feed")
      }*/
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};// only the restaurant should be able to delete, so I think here - here is only to delete image i need to delete entire entry 