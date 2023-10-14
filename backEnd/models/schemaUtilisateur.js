const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SchemaProd = mongoose.Schema;
const ObjectId = SchemaProd.ObjectId;

const utilisateur = new mongoose.Schema({
	_id: ObjectId,
	Admin: { type: Boolean, required: true },
	nom: { type: String, required: true },
	prenom: { type: String, required: true },
	email: { type: String, required: true },
	addressNumero: { type: Number, required: false },
	addressRue: { type: String, required: false },
	ville: { type: String, required: false },
	Codepostal: { type: Number, required: false },
	password: { type: String, required: true }
});

const userModel = mongoose.model('utilisateur', utilisateur);

async function addUser() {
	await userModel.create({ _id: new mongoose.Types.ObjectId(), Admin: true, nom: "Admin", prenom: "Admin", email: "admin@gmail.com", addressNumero: 1, addressRue: "rue de l'admin", ville: "Adminville", Codepostal: 12345, password: bcrypt.hashSync("admin", 10) });
	await userModel.create({ _id: new mongoose.Types.ObjectId(), Admin: false, nom: "toto", prenom: "toto", email: "toto@gmail.com", addressNumero: 1, addressRue: "rue de toto", ville: "totoville", Codepostal: 54321, password: bcrypt.hashSync("toto", 10) });
}

userModel.find({}).then((data) => {
		if (data.length === 0) {
			addUser();
		}
	}
);

module.exports = userModel;
