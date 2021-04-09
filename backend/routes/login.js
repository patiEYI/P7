const express = require("express");
const router = express.Router();

const verifyPassword = require("../services.js/password");
const verifyEmail = require("../services.js/email");

const rateLimit = require("express-rate-limit");
//limite les connexions abusives
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 100, // limit each IP to 3 requests per windowMs
  message: "Too much requests ,you have to wait for 3 minutes !",
});

const logCtrl = require("../controllers/login");

// Creer un user
router.post("/signup", verifyPassword, verifyEmail , logCtrl.signup);
// Se connecter limiter
router.post("/login" ,  logCtrl.login);

router.put("/updatePassword", verifyPassword, logCtrl.updatePassword);

module.exports = router;