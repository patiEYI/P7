const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/like");
const unlikeCtrl = require("../controllers/unlike");
const auth = require("../middleware/auth");

// Creer Like
router.post("/like", auth,  likeCtrl.createLike);

//Creer unlike
router.post("/unlike", auth , unlikeCtrl.createUnlike);

// supprimer Like 
router.delete("/like/:id", auth ,  likeCtrl.deleteLike);

//supprimer unlike
router.delete("/unlike/:id", auth , unlikeCtrl.deleteUnlike);

//  Tous les Likes
router.get("/like", auth ,  likeCtrl.findAllLikes);

// Tous les Unlikes
router.get("/unlike", auth,  unlikeCtrl.findAllUnlikes);


module.exports = router;