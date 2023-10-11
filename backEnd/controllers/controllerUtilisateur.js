const mongoose = require('mongoose');
const userModel = require("../models/schemaUtilisateur");
const bcrypt = require('bcrypt');

const sinscrire = (req, res, next) => {
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
        password: bcrypt.hashSync(password, 10)
    }).then(todo => {
        console.log('POST creating new user: ' + todo);
        res.format({
            json: function () {
                res.json(todo);
            }
        })
    }).catch(
        (error) => {
            return next(error);
        });
}

const connexion = (req, res, next) => {
    const {email, password} = req.body;
    userModel.findOne({email: email}).then((user) => {
            if (user === null) {
                res.json("Mauvais identifiants");
            } else if (!bcrypt.compareSync(password, user.password)) {
                res.json("Mauvais identifiants");
            } else {
                res.json(user);
            }
        }
    ).catch(
        (error) => {
            return next(error);
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
            return next(error);
        });
}

const getUtilisateurNom = (req, res, next) => {
    const {id} = req.body;
    userModel.findById(id).then((user) => {
        if (user === null) {
            res.json("Utilisateur introuvable");
        } else {
            res.json(user.nom);
        }
    }).catch((error) => {
        return next(error);
    });
}

// we export a list of all our controllers
module.exports = {sinscrire, connexion, isAdmin, getUtilisateurNom};