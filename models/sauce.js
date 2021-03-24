const mongoose = require('mongoose'); // On importe Mongoose


const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], defaultValue: [] },
  usersDisliked: { type: [String], defaultValue: [] },
});
// On exporte le sauceSchema(modèle terminé)
module.exports = mongoose.model("Sauce", sauceSchema);
