const passwordValidator = require("password-validator");

//création du schema
let passwordSchema = new passwordValidator();

//le schéma que doit respecteur le mot de passe
passwordSchema
  .is()
  .min(8) // minimum 8 caractères
  .is()
  .max(100) // maximum 25 caractères
  .has()
  .uppercase() // une majuscule
  .has()
  .lowercase() // une minuscule
  .has()
  .not()
  .spaces() // pas d'espaces
  .has()
  .digits(); // un chiffre
//Vérification de la qualité du password par rapport au schema
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({ error: "Mot de passe faible : " + passwordSchema.validate(req.body.password, { list: true }) });
  } else {
    next();
  }
};
