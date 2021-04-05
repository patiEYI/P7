const express = require("express");
const router = express.Router();

const verifyPassword = require("../middleware/password");
const verifyEmail = require("../middleware/email");


const rateLimit = require("express-rate-limit");
//limite les connexions abusive
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 100, // limit each IP to 3 requests per windowMs
  message: "Trop de requetes abusives , vous devez attendre 3 minutes",
});

const logCtrl = require("../controllers/login");

// Creer un user
router.post("/signup", verifyPassword, verifyEmail, logCtrl.signup);
// Se connecter
router.post("/login",  logCtrl.login);
// limiter,
router.put("/updatePassword", verifyPassword, verifyEmail,  logCtrl.updatePassword);

module.exports = router;