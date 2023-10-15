const mongoose = require('mongoose');
const productModel = require("../models/schemaProd");

const storeProduct = (req, res, next) => {
	const { title, description, prix, quantite } = req.body;
	productModel.create({
		_id: new mongoose.Types.ObjectId(),
		title: title,
		description: description,
		prix: prix,
		quantite: quantite,
	}).then(produit => {
		res.json(produit);
	}).catch((error) => {
		return next(error);
	});
}

const getProduits = (_req, res, next) => {
	productModel.find({}).then((produits) => {
		res.json(produits);
	}).catch((error) => {
		return next(error);
	});
};

const getProduit = (req, res, next) => {
	const { id } = req.params;
	productModel.findById(id).then((prod) => {
		if (prod.quantite > 0) {
			res.json(prod);
		} else {
			res.json("Le produit n'est plus disponible");
		}
	}).catch((error) => {
		return next(error);
	});
};


module.exports = { getProd: getProduit, tout: getProduits, storeProduct };