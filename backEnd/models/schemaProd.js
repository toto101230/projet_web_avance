const mongoose = require('mongoose');
const SchemaProd = mongoose.Schema;
const ObjectId = SchemaProd.ObjectId;

const prod = new mongoose.Schema({
    _id: ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true }, // Utilisez 'Number' au lieu de 'Integer'
    quantite:{type:Number,required:true}
});

const commande = new mongoose.Schema({
    _id: ObjectId,
    utilisateur: { type: String, required: true },
    listeProduits: { type: [prod], required: true },
    valide: { type: Boolean, required: true }, // Utilisez 'Number' au lieu de 'Integer'
});

module.exports = mongoose.model('produit',prod);
//module.exports = mongoose.model('commande',commande);
