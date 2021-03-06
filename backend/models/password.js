const passValidator = require("password-validator");

const passSchema = new passValidator();

//shema du mot de passe
passSchema
  .is()
  .min(8)
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

module.exports = passSchema;