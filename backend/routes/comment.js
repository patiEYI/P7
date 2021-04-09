const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

// Creer un Commentaire
router.post("/comment", auth , commentCtrl.createComment);

// Tous les Commentaires
router.get("/comment", auth , commentCtrl.findAllComment);

// Retrouver un commentaire
router.get("/comment/:id",  commentCtrl.findOneComment);

// Modifier un Commentaire
 router.put("/comment/:id", auth , commentCtrl.updateOneComment);

// Supprimer un Commentaire 
router.delete("/comment/:id", auth ,  commentCtrl.deleteOneComment);


module.exports = router;