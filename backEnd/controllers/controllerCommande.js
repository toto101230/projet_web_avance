const mongoose = require('mongoose');
const commandeModel = require("../models/schemaCommande");
const productModel = require("../models/schemaProd");

const commander = (req, res) => {
    const {utilisateur, listeProduits, valide} = req.body;

    commandeModel.create({
        _id: new mongoose.Types.ObjectId(),
        utilisateur: utilisateur,
        listeProduits: listeProduits,
        valide: valide
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

        // for (let key in listeProduits) {
        //     console.log(key);
        //     if (listeProduits.hasOwnProperty(key)) {
        //
        //         const value = listeProduits[key];
        //         let actual = productModel.findById(key).then((lobjet) => {
        //             console.log(lobjet);
        //             let diff = lobjet.quantite - value;
        //             prodController.updateProd(key, diff);
        //             console.log('on fait une reservation! ' + todo);
        //             res.json(todo);
        //         });
        //     }
        // }
    }).catch((error) => {
        return res.send("There was a problem " + error);
    });
}

const getAllCommandes = (req, res) => {
    commandeModel.find({}).then((commandes) => {
        res.json(commandes);
    }).catch((error) => {
        return next(error);
    });
}



module.exports = {commander, getAllCommandes};