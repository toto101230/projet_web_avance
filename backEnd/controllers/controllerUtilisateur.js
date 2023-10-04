const mongoose = require('mongoose');
const productModel = require("../models/schemaUtilisateur");

const sinscrire = (req, res) => {
    const {Admin,nom,prenom,email,addressNumero,addressRue,ville,codepostal} = req.body;
    productModel.create({
        _id: new mongoose.Types.ObjectId(),
        Admin:Admin,
        nom:nom,
        prenom:prenom,
        email:email,
        addressNumero:addressNumero,
        addressRue:addressRue,
        ville:ville,
        Codepostal:codepostal
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
module.exports = {sinscrire};