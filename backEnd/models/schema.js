const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const prod = new mongoose.Schema({
    _id: ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true }, // Utilisez 'Number' au lieu de 'Integer'
    quantite:{type:Number,required:true}
});

module.exports = mongoose.model('produit',prod);