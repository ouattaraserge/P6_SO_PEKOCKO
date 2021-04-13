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

/*const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (sauce.userId === req.user) {
      next();
    } else {
      res.status(401).json({
        message: "Vous n'êtes pas le propriétaire de cette sauce donc vous ne pouvez pas y toucher",
      });
    }
  });
};*/

/*const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.userId,
    });
    if (!user) {
      throw new Error();
    }
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
module.exports = auth;*/
