const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  cin: { type: Number, required: true },
  tel: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gouvernorat: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  age: { type: Number, 
    required: function(){return this.role ==='etudiant'}},

  institut: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  niveau: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  adresse: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  code_postal: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  about: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  photo: { 
    type: String, 
    required: function () { return this.role === 'etudiant'; } 
  },
  role: { type: String, enum: ['etudiant', 'bailleur'], required: true },
  etat: { type: String, default: 'en cours' },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
