const express = require('express');
const commandeController = require('../controllers/controllerCommande');

const router = express.Router();

router.route('/commander').post(commandeController.commander);
router.route('/commandes').get(commandeController.getAllCommandes);
router.route('/commande/valider').post(commandeController.validerCommande);

module.exports = router;