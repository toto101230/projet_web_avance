const mongoose = require('mongoose');
const userModel = require("../models/schemaUtilisateur");
const bcrypt = require('bcrypt');
const { sign, verify } = require("jsonwebtoken");

const secretKey = 'RANDOM_TOKEN_SECRET tellement secret que personne ne le connait !';

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
		res.status(200).json({
			nom: data.nom,
			token: sign(
				{ userId: data._id },
				secretKey,
				{ expiresIn: '24h' }
			)
		});
	}).catch((error) => {
		return next(error);
	});
}

const connexion = (req, res, next) => {
	const { email, password } = req.body;
	userModel.findOne({ email: email }).then((user) => {
		if (user === null) {
			res.status(400);
		}
		bcrypt.compare(password, user.password).then((result) => {
			if (result === false) {
				res.status(400);
			} else {
				res.json({
					nom: user.nom,
					token: sign(
						{ userId: user._id },
						secretKey,
						{ expiresIn: '24h' }
					)
				});
			}
		}).catch((error) => {
			return next(error);
		});
	}).catch((error) => {
		return next(error);
	});
}

const isAdmin = (req, res, next) => {
	const { token } = req.body;
	try {
		const decodedToken = verify(token, secretKey);
		const userId = decodedToken.userId;
		userModel.findById(userId).then((user) => {
			if (user === null) {
				res.status(400).json("Erreur de connexion");
			} else if (user.Admin !== true) {
				res.status(400).json("Vous n'avez pas les droits");
			} else {
				res.status(200).json(user.nom);
			}
		}).catch((error) => {
			return next(error);
		});
	} catch (error) {
		return next(error);
	}
}

const getUtilisateur = (req, res, next) => {
	const { token } = req.body;
	try {
		const decodedToken = verify(token, secretKey);
		const userId = decodedToken.userId;
		userModel.findById(userId).then((user) => {
			if (user === null) {
				res.status(400).json("Erreur de connexion");
			} else {
				res.json(user);
			}
		}).catch((error) => {
			return next(error);
		});
	} catch (error) {
		return next(error);
	}
}

const majAddress = (req, res, next) => {
	const { token, addressNumero, addressRue, ville, Codepostal } = req.body;
	try {
		const decodedToken = verify(token, secretKey);
		const userId = decodedToken.userId;
		userModel.findOneAndUpdate({ _id: userId }, {
			addressNumero: addressNumero,
			addressRue: addressRue,
			ville: ville,
			Codepostal: Codepostal
		}).then((user) => {
			if (user === null) {
				res.json("Utilisateur introuvable");
			} else {
				res.json(user);
			}
		}).catch((error) => {
			return next(error);
		});
	} catch (error) {
		return next(error);
	}
}

// we export a list of all our controllers
module.exports = { sinscrire, connexion, isAdmin, getUtilisateur, majAddress };