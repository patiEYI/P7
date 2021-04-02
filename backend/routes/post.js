const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


const postCtrl = require("../controllers/post");

//Creer un Post
router.post("/post",auth,  multer, postCtrl.createPosts);

// Tous les Post
 router.get("/post", auth, postCtrl.findAllPosts);

// Trouver un post
 router.get("/post/:postId",auth,  postCtrl.findOnePosts);

// Modifier un post
 router.put("/post/:postId",auth, multer, postCtrl.updateOnePosts);

// Supprimer un post
 router.delete("/post/:postId",auth,  postCtrl.deleteOnePosts);

// Supprimer tous les Posts
 router.delete("/post",auth, postCtrl.deleteAllPosts);

module.exports = router;
