require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
/*const mongoSanitize = require("express-mongo-sanitize");*/
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const helmet = require("helmet");

mongoose
  .connect("mongodb+srv://sergeo:Esinturl0@OGS@cluster0.0paei.mongodb.net/P6_SO_PEKOCKO?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(helmet());

//Protection contre les injections sql
/*app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);*/

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

/*app.use("/", (req, res, next) => {
  res.end("Server created !");
});*/

module.exports = app;
