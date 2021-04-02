const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// creation des routes de commentaire des utilisateurs modif get et supprimer commentaire

const commentCtrl = require("../controllers/comment");

// Creer un Commentaire
router.post("/comment", auth , commentCtrl.createComment);

// Tous les Commentaires
router.get("/comment", auth , commentCtrl.findAllComment);

// Retrouver un commentaire
// router.get("/comment/:commentId",  commentCtrl.findOneComment);

// Modifier un Commentaire
 router.put("/comment/:id", auth , commentCtrl.updateOneComment);

// Supprimer un Commentaire 
router.delete("/comment/:id", auth ,  commentCtrl.deleteOneComment);

// Supprimer tous les Commentaires
router.delete("/comment", auth , commentCtrl.deleteAllComment);

module.exports = router;