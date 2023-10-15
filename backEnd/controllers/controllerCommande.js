const mongoose = require('mongoose');
const commandeModel = require("../models/schemaCommande");
const productModel = require("../models/schemaProd");

const commander = (req, res, next) => {
	const { utilisateur, listeProduits } = req.body;

	//on vérifie que les produits sont disponibles
	productModel.find({ _id: { $in: listeProduits.map((produit) => produit[0]) } }).then((produits) => {
		if (produits.length === 0) {
			return null;
		}
		for (let i = 0; i < produits.length; i++) {
			let diff = -1;
			listeProduits.forEach((produitCommande) => {
				if (produitCommande[0] === produits[i]._id.toString()) {
					diff = produits[i].quantite - produitCommande[1];
				}
			});
			if (diff < 0) {
				return null;
			}
		}
		return produits;
	}).then((produits) => {
		// on met à jour la quantité des produits
		if (produits === null) {
			return null;
		}
		for (let i = 0; i < produits.length; i++) {
			listeProduits.forEach((produitCommande) => {
				if (produitCommande[0] === produits[i]._id.toString()) {
					const diff = produits[i].quantite - produitCommande[1];
					productModel.findByIdAndUpdate(produits[i]._id.toString(), { quantite: diff }).then(() => {});
				}
			})
		}
		return produits;
	}).then((produits) => {
		// on crée la commande
		if (produits === null) {
			res.status(400).json({ message: "Erreur de commande" });
			return;
		}
		commandeModel.create({
			_id: new mongoose.Types.ObjectId(),
			utilisateur: utilisateur,
			listeProduits: listeProduits,
			valide: false
		}).then((data) => {
			res.json(data);
		}).catch((error) => {
			return next(error);
		});
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
	const { id } = req.body;
	commandeModel.findByIdAndUpdate(id, { valide: true }).then((commande) => {
		res.json(commande);
	}).catch((error) => {
		return next(error);
	});
}


module.exports = { commander, getAllCommandes, validerCommande };