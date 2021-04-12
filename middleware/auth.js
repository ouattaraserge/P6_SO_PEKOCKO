const jwt = require("jsonwebtoken");
const { findOne } = require("../models/sauce");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    console.log("-----");
    console.log(userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw "ID utilisateur non valide !";
    } else {
      req.user = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête non valide !"),
    });
  }
};

/*module.exports = (req, res, next) => {
  console.log(req.user);
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      console.log("Propriétaire : " + sauce.userId);
      console.log("User connecté : " + req.user);
      if (sauce.userId === req.user) {
        next();
      } else {
        res.status(401).json({
          message: "Vous n'êtes pas le propriétaire de cette sauce donc vous ne pouvez pas y toucher"
        });
      }
    });
}*/
