const mongoose = require('mongoose');
const commandeModel = require("../models/schemaCommande");
const productModel = require("../models/schemaProd");
const prodController = require('./controllerProd');

const commander = (req, res) => {
    const {utilisateur,listeProduits, valide} = req.body;

    commandeModel.create({
        _id: new mongoose.Types.ObjectId(),
        utilisateur:utilisateur,
        listeProduits:listeProduits,
        valide:valide
    }).then((todo) => {
        //console.log(listeProduits);

        for (let key in listeProduits)
        {
            if (listeProduits.hasOwnProperty(key))
            {

                const value = listeProduits[key];
                let actual=productModel.findById(key).then((lobjet)=>
                {
                    let diff=lobjet.quantite-value;
                    prodController.updateProd(key, diff).then({});
                });

                //console.log(diff,actual,value+" la diff");

            }
        }

        //prod.updateProd(todo.get(listeProduits))
        console.log('on fait une reservation! ' + todo);
        res.json(todo);
    }).catch(
        (error) => {
            return res.send("There was a problem " + error);
        });
}


module.exports = {commander};