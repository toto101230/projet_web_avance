const mongoose = require('mongoose');
const userModel = require("../models/schemaUtilisateur");
const bcrypt = require('bcrypt');

const sinscrire = (req, res, next) => {
	const { Admin, nom, prenom, email, addressNumero, addressRue, ville, codepostal, password } = req.body;
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
	}).then(data => {
		console.log('POST creating new user: ' + data);
		res.format({
			json: function () {
				res.json(data);
			}
		})
	}).catch(
		(error) => {
			return next(error);
		});
}

const connexion = (req, res, next) => {
	const { email, password } = req.body;
	userModel.findOne({ email: email }).then((user) => {
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
	const { nom } = req.body;
	userModel.findOne({ nom: nom }).then((user) => {
			if (user === null) {
				res.status(401).json("Erreur de connexion");
			} else if (user.Admin !== true) {
				res.status(401).json("Vous n'avez pas les droits");
			} else {
				res.status(200).json(user.nom);
			}
		}
	).catch(
		(error) => {
			console.log(error);
			return next(error);
		});
}

const getUtilisateurNom = (req, res, next) => {
	const { id } = req.body;
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
module.exports = { sinscrire, connexion, isAdmin, getUtilisateurNom };