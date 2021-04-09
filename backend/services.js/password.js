const passSchema = require("../models/password");

// logique du modele utiliser pour valider le mot de passe
module.exports = (req, res, next) => {
  if (!passSchema.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "le mot de passe doit avoir au moins une minuscule et majuscule 8 caracter min et 15 max 1 chiffre min pas d'espace" +
        passSchema.validate(" ", { list: true }),
    });
  } else {
    next();
  }
};
