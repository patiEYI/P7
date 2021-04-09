const emailSchema = require("validator");

//validation email
module.exports = (req, res, next) => {
  if (!emailSchema.isEmail(req.body.email)) {
    res.status(400).json({
      error: "veuillez rentrer un email valide ! ex : marie@outlook.com",
    });
  } else {
    next();
  }
};