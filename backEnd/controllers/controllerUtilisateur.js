const mongoose = require('mongoose');
const userModel = require("../models/schemaUtilisateur");

const sinscrire = (req, res) => {
    const {Admin, nom, prenom, email, addressNumero, addressRue, ville, codepostal, password} = req.body;
    userModel.create({
        _id: new mongoose.Types.ObjectId(),
        Admin: Admin,
        nom: nom,
        prenom: prenom,
        email: email,
        addressNumero: addressNumero,
        addressRue: addressRue,
        ville: ville,
        Codepostal: codepostal,
        password: password
    }).then(todo => {
        console.log('POST creating new user: ' + todo);
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

const connexion = (req, res, next) => {
    const {email, password} = req.body;
    userModel.findOne({email: email}).then((user) => {
            if (user === null) {
                res.json("Erreur de connexion");
            } else if (user.password !== password) {
                res.json("Mauvais identifiants");
            } else {
                res.json(user);
            }
        }
    ).catch(
        (error) => {
            return res.send("There was a problem " + error);
        });

}

const isAdmin = (req, res, next) => {
    const {name} = req.body;
    userModel.findOne({name: name}).then((user) => {
            if (user === null) {
                res.json("Erreur de connexion");
            } else if (user.Admin !== true) {
                res.json("Vous n'avez pas les droits");
            } else {
                res.json(user.nom);
            }
        }
    ).catch(
        (error) => {
            return res.send("There was a problem " + error);
        });
}

const getUtilisateur = (req, res, next) => {
    const {id} = req.body;
    userModel.findById(id).then((user) => {
        if (user === null) {
            res.json("Erreur de connexion");
        } else {
            res.json(user);
        }
    }).catch((error) => {
        return next(error);
    });
}

// we export a list of all our controllers
module.exports = {sinscrire, connexion, isAdmin};