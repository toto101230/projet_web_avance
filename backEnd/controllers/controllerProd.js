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

	}).then(data => {
		console.log('POST creating new product: ' + data);
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

const getProduits = (_req, res, next) => {
	productModel.find({})
		.then((produits) => {
			//respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header

			res.json(produits);

		}).catch((error) => {
		// transmit the error to the next middleware
		return next(error);
	});
};

const getProduit = (req, res, next) => {
	productModel
		.findById(req.params.id)
		.then((prod) => {
			if (prod.quantite > 0) {
				console.log('GET Retrieved ID: ' + prod._id);
				res.json(prod);
			} else {
				res.json("Le produit n'est plus disponible");
			}

		})
		.catch((error) => {
			// transmit the error to the next middleware
			return next(error);
		});
};


module.exports = { getProd: getProduit, tout: getProduits, storeProduct };