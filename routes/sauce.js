const express = require("express");
const router = express.Router();
const sauceAuth = require("../middleware/sauceAuth.js");
const xssSauce = require("../middleware/xss-sauce.js");
const sauceCtrl = require("../controllers/sauce.js");
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer-config");

//CRUD
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, sauceAuth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceAuth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
