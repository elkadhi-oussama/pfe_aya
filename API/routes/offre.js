const express = require('express');
const router = express.Router();
const Offer = require('../models/Offre');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



// Configuration de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './offres');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Ajouter une offre
router.post('/add', upload.array('images', 4), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ msg: 'Au moins une image est requise' });
    }

    const images = req.files.map(file => file.filename);

    const newOffer = new Offer({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        images,
        createdBy: req.body.createdBy  // transmis depuis le frontend
      });

    await newOffer.save();
    res.status(201).send({ msg: 'Offre créée', offer: newOffer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Erreur serveur lors de la création de l’offre' });
  }
});

// Obtenir toutes les offres 
router.get("/all", async (req, res) => {
  try {
    let result = await Offer.find();
    res.send({ offre: result, msg: "all offers " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});

// Obtenir les offres d’un bailleur spécifique
router.get("/:id", async (req, res) => {
  try {
    const result = await Offer.find({ createdBy: req.params.id });
    res.status(200).send({ offers: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Erreur lors du chargement des offres du bailleur" });
  }
});

// Supprimer une offre
router.delete('/:id',  async (req, res) => {
  try {
    const offer = await Offer.findOneAndDelete({ _id: req.params.id});
    if (!offer) return res.status(404).send({ msg: "Offre introuvable ou accès interdit" });
    res.send({ msg: 'Offre supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Erreur lors de la suppression' });
  }
});

// Modifier une offre
router.put('/:id', upload.array('images', 4), async (req, res) => {
  try {
    const existingOffer = await Offer.findById(req.params.id);
    if (!existingOffer) {
      return res.status(404).send({ msg: 'Offre introuvable' });
    }

    const updateFields = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };

    // Récupérer les images à garder (envoyées depuis le front)
    let imagesToKeep = existingOffer.images;
    if (req.body.imagesToKeep) {
      imagesToKeep = JSON.parse(req.body.imagesToKeep);
    }

    // Supprimer les images qui ne sont plus utilisées
    const removedImages = existingOffer.images.filter(img => !imagesToKeep.includes(img));
    removedImages.forEach((img) => {
      const filePath = path.join(__dirname, '..', 'offres', img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    // Ajouter les nouvelles images (si existantes)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      updateFields.images = [...imagesToKeep, ...newImages];
    } else {
      updateFields.images = imagesToKeep;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.send({ msg: 'Offre mise à jour', offer: updatedOffer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Erreur serveur lors de la mise à jour' });
  }
});

module.exports = router;
