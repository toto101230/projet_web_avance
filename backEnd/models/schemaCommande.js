const mongoose = require("mongoose");
//const prod=require("./schemaProd");
const SchemaProd = mongoose.Schema;
const ObjectId = SchemaProd.ObjectId;


const commande = new mongoose.Schema({
    _id: ObjectId,
    utilisateur: { type: String, required: true },
    listeProduits:{type: Map, of: String, required: true },
    valide: { type: Boolean, required: true }, // Utilisez 'Number' au lieu de 'Integer'
}, {strict: false});


module.exports = mongoose.model('commande',commande);