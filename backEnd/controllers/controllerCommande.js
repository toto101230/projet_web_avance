const mongoose = require('mongoose');
const productModel = require("../models/schemaCommande.js");

const commander = (req, res) => {
    const {utilisateur,listeProduits, valide} = req.body;
    productModel.create({
        _id: new mongoose.Types.ObjectId(),
        utilisateur:utilisateur,
        listeProduits:listeProduits,
        valide:valide
    }).then(todo => {
        console.log('on fait une reservation! ' + todo);
        res.json(todo);
    }).catch(
        (error) => {
            return res.send("There was a problem " + error);
        });
}

module.exports = {commander};