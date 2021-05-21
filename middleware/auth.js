const jwt = require("jsonwebtoken");
const { findOne } = require("../models/sauce");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
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
