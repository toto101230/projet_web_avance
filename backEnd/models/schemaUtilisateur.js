const mongoose = require('mongoose');
const SchemaProd = mongoose.Schema;
const ObjectId = SchemaProd.ObjectId;

const utilisateur = new mongoose.Schema({
    _id: ObjectId,
    Admin: { type: Boolean, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    addressNumero: { type: Number, required: false },
    addressRue: { type: String, required: false },
    ville: { type: String, required: false }, // Utilisez 'Number' au lieu de 'Integer'
    Codepostal:{type:Number,required:false},
    password: { type: String, required: true }
});

module.exports = mongoose.model('utilisateur',utilisateur);
