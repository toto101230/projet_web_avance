import mongoose from "mongoose";

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
module.exports = {storeProduct};