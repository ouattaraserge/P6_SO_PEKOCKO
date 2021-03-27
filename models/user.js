const mongoose = require("mongoose");

//Contrôle des mails(Avoir qu'un seul mail dans la base de donnée)
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Pour éviter d'enregistrer plusieurs fois la même adresse mail dans la base de donnée
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
