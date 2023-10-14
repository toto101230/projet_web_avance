const mongoose = require('mongoose');
const SchemaProd = mongoose.Schema;
const ObjectId = SchemaProd.ObjectId;

const prod = new mongoose.Schema({
	_id: ObjectId,
	title: { type: String, required: true },
	description: { type: String, required: true },
	prix: { type: Number, required: true },
	quantite: { type: Number, required: true }
});

const productModel = mongoose.model('produit', prod);

async function addProduct() {
	await productModel.create({ _id: new mongoose.Types.ObjectId(), title: "Produit 1", description: "Description produit 1", prix: 8.77, quantite: 8 });
	await productModel.create({ _id: new mongoose.Types.ObjectId(), title: "Produit 2", description: "Description produit 2", prix: 5.99, quantite: 10 });
	await productModel.create({ _id: new mongoose.Types.ObjectId(), title: "Produit 3", description: "Description produit 3", prix: 2.99, quantite: 5 });
	await productModel.create({ _id: new mongoose.Types.ObjectId(), title: "Produit 4", description: "Description produit 4", prix: 1.99, quantite: 2 });
	await productModel.create({ _id: new mongoose.Types.ObjectId(), title: "Produit 5", description: "Description produit 5", prix: 0.99, quantite: 18 });
}

productModel.find({}).then((data) => {
		if (data.length === 0) {
			addProduct();
		}
	}
);

module.exports = productModel;
