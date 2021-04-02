const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/users");

const multer = require("../middleware/multer-config");


//Tous les Users
router.get("/users", auth , userCtrl.findAllUsers);

// Trouver un user
router.get("/users/:userId", auth ,  userCtrl.findOneUser);

//Modifier un user
router.put("/users/:userId", auth ,  multer, userCtrl.updateOneUser);

//Supprimer un user
router.delete("/users/:userId", auth ,  userCtrl.deleteOneUser);

// Supprimer tous les Users
 router.delete("/users", auth , userCtrl.deleteAllUsers);

module.exports = router;