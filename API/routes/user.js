const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer  = require('multer')
const userRouter = express.Router();
const {registerRules,loginRules,validation} = require("../middlewares/validator");
const isAuth = require('../middlewares/passport');
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
//register new user "post"
userRouter.post("/register",
  upload.single("photo"),  
  registerRules(),
  validation,
  async (req, res)=> {
  const { nom, prenom, cin, tel, email, password, gouvernorat,institut,age,niveau, adresse, code_postal, about, role } = req.body;

 // Si le rôle est "etudiant", vérifie que la photo est présente
  if (role === "etudiant" && !req.file) {
    return res.status(400).send({ msg: "photo is required for etudiant" });
  }

  const photoUrl = req.file ? req.file.filename : null; // Si photo existe, on l'assigne

  try {
    const newuser = new User({
      nom, prenom, cin, tel, email, password, gouvernorat,institut,age,niveau, adresse, code_postal, about, photo: photoUrl, role
    });

    const salt = 10;
    const gensalt = await bcrypt.genSalt(salt);
    const hashedpassword = await bcrypt.hash(password, gensalt);
    newuser.password = hashedpassword;

    const searcheduser = await User.findOne({ email });
    if (searcheduser) {
      return res.status(400).send({ msg: "email already exist" });
    }

    const newUserToken = await newuser.save();
    const payload = { _id: newUserToken._id, name: newUserToken.name };
    const token = jwt.sign(payload, process.env.SecretOrKey, { expiresIn: 3600 });

    res.status(200).send({ newUserToken, msg: "user is saved", token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "can not save the user" });
  }
});


//login
userRouter.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    // find if the user exists
    const searcheduser = await User.findOne({ email });

    // if the email does not exist
    if (!searcheduser) {
      return res.status(400).send({ msg: "Vérifiez vos informations" });
    }

    //  Bloquer l'accès si l'état est "en cours"
    if (searcheduser.etat === "en cours") {
      return res.status(403).send({ msg: "Votre compte est en attente de validation par l'administrateur." });
    }

    // if the passwords are not equal
    const match = await bcrypt.compare(password, searcheduser.password);
    if (!match) {
      return res.status(400).send({ msg: "Vérifiez vos informations" });
    }

    // create a token
    const payload = {
      _id: searcheduser._id,
      name: searcheduser.name,
    };

    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    // send the user
    res.status(200).send({
      user: searcheduser,
      msg: "success",
      token: `Bearer ${token}`,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Impossible de trouver l'utilisateur" });
  }
});


//get current profile
userRouter.get("/current", isAuth(),(req,res) => {
    res.status(200).send({user:req.user});
})

//update user
userRouter.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const updateFields = { ...req.body };
    if (req.file) {
      updateFields.photo = req.file.filename;
    }
    const updated = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.send({ msg: "Profil mis à jour", user: updated });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Erreur serveur lors de la mise à jour" });
  }
});


//  Valider ou refuser un utilisateur
userRouter.put('/validate/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { etat: req.body.etat }, // "accepté", "refusé"
      { new: true }
    );
    res.send({ msg: 'État mis à jour', user: updated });
  } catch (err) {
    res.status(500).send({ msg: 'Erreur serveur' });
  }
});


//get allusers
userRouter.get("/allusers", async (req, res) => {
  try {
    let result = await User.find();
    res.send({ users: result, msg: "all users " });
  } catch (error) {
    res.send({ msg: "fail" });
    console.log(error);
  }
});


// Route GET /user/filter
userRouter.get('/filter', async (req, res) => {
  try {
    const { age, institut, about } = req.query;

    // Construction dynamique du filtre
    let filter = {
      role: "etudiant",   // seuls les étudiants
      etat: "accepté",    // uniquement ceux validés
    };

    if (age) filter.age = Number(age);
    if (institut) filter.institut = institut;

    if (about) {
      filter.about = { $regex: about, $options: "i" }; // recherche insensible à la casse
    }

    const users = await User.find(filter).select('-password'); // on peut exclure password par sécurité
    res.json({ users });
  } catch (error) {
    console.error("Erreur filtre users :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});



//delete user 
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ msg: "Utilisateur introuvable" });

    // Supprimer photo associée si existe
    if (user.photo) {
      const filepath = path.join(__dirname, "..", "files", user.photo);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }

    res.send({ msg: "Utilisateur supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Erreur serveur" });
  }
});




module.exports = userRouter; 