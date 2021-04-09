const express = require("express");
const router = express.Router();
const isOwner = require("../middleware/auth");
const xssSauce = require("../middleware/xss-sauce");
const sauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//CRUD
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, isOwner, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, isOwner, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
