const mongoose = require('mongoose');
const commandeModel = require("../models/schemaCommande");
const productModel = require("../models/schemaProd");

const commander = (req, res, next) => {
    const {utilisateur, listeProduits} = req.body;

    commandeModel.create({
        _id: new mongoose.Types.ObjectId(),
        utilisateur: utilisateur,
        listeProduits: listeProduits,
        valide: false
    }).then((todo) => {
        console.log(listeProduits);
        listeProduits.forEach((produit) => {
            productModel.findById(produit[0]).then((objet) => {
                const diff = objet.quantite - produit[1];
                if(diff < 0){
                    res.status(400).json({message: "Erreur de commande"});
                    return;
                }
                productModel.findByIdAndUpdate(produit[0], {quantite: diff}).then((obj) => {
                    // console.log('on fait une reservation! ' + todo);
                });
            }).catch((error) => {
                console.log(error);
                return res.send("Il y a eu un problème " + error);
            });
        });
        res.json(todo);
    }).catch((error) => {
        return next(error);
    });
}

const getAllCommandes = (req, res, next) => {
    commandeModel.find({}).then((commandes) => {
        res.json(commandes);
    }).catch((error) => {
        return next(error);
    });
}

const validerCommande = (req, res, next) => {
    const {id} = req.body;
    commandeModel.findByIdAndUpdate(id, {valide: true}).then((commande) => {
        res.json(commande);
    }).catch((error) => {
        return next(error);
    });
}



module.exports = {commander, getAllCommandes, validerCommande};