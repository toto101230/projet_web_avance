const mongoose = require('mongoose');
const productModel = require("../models/schema.js");

const storeProduct = (req, res) => {
    const {title, description, prix, quantite} = req.body;
    productModel.create({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        description: description,
        prix: prix,
        quantite: quantite,

    }).then(todo => {
        console.log('POST creating new product: ' + todo);
        res.format({
            json: function () {
                res.json(todo);
            }
        })
    }).catch(
        (error) => {
            return res.send("There was a problem " + error);
        });
    }
// we export a list of all our controllers

const indexProduit = (req, res) => {
    let value = [{title: "Produit 1", description: "Description produit 1", prix: 1.99, quantite: 1},
        {title: "Produit 2", description: "Description produit 2", prix: 2.99, quantite: 1}]
    res.json(value);
}

const tout = (_req, res, next) => {
    productModel.find({})
        .then((produits) => {
            //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
            res.format({
                // JSON response will show all users in JSON format
                json: () => {
                    res.json(produits);
                }
            });
        })
        .catch((error) => {
            // transmit the error to the next middleware
            return next(error);
        });
};

const getProd = (req, res, next) => {
    productModel
        .findById(req.params.id)
        .then((prod) => {
            console.log('GET Retrieved ID: ' + prod._id);
            res.format({
                json: () => {
                    res.json(prod);
                }
            });
        })
        .catch((error) => {
            // transmit the error to the next middleware
            return next(error);
        });
};

module.exports = {getProd,tout,storeProduct, indexProduit};