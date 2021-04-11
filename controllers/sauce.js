const Sauce = require("../models/sauce");

//Package file system de node qui assure la suppression de l'image pour chaque sauce
const fs = require("fs");

//Création de sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce enregistrée avec succès !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  sauceObject.likes = 0;
  sauceObject.dislikes = 0;
  sauceObject.usersLiked = Array();
  sauceObject.usersDisliked = Array();
};

//Modifier la sauce
/*exports.modifySauce = (req, res, next) => {
  const paramId = req.params.id;
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};*/

exports.modifySauce = (req, res, next) => {
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split("/images")[1];
        //suppression de l'image de la sauce qui va être remplacée
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
  }

  //l'objet qui va être envoyé dans la base de donnée
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  //update dans la base de donnée
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
};

//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  const paramId = req.params.id;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
//Trouver une seule sauce
exports.getOneSauce = (req, res, next) => {
  const paramId = req.params.id;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//Trouver toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};
//Like et Dislike

exports.likeDislikeSauce = (req, res, next) => {
  if (req.body.like === 1) {
    //l'utilisateur aime la sauce
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } }) // on ajoute 1 like
      .then((sauce) => res.status(200).json({ message: "Un like en plus !" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    //L'utilisateur n'aime pas la sauce
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: req.body.like++ * -1 }, $push: { usersDisliked: req.body.userId } })
      .then((sauce) => res.status(200).json({ message: "Un dislike en plus !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    // si l'utilisateur enleve son vote, like === 0
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }) // $pull : Vide le tableau et empêche de voter plusieurs fois par un même utilisateur
            .then((sauce) => {
              res.status(200).json({ message: "Un like en moins !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
            .then((sauce) => {
              res.status(200).json({ message: "Un dislike en moins !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
