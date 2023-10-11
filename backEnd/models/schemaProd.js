const mongoose = require('mongoose');
const SchemaProd = mongoose.Schema;
const ObjectId = SchemaProd.ObjectId;

const prod = new mongoose.Schema({
    _id: ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    quantite:{type:Number,required:true}
});

module.exports = mongoose.model('produit',prod);
