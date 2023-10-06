const express = require('express');
const userController = require('../controllers/controllerUtilisateur');

const router = express.Router();

router.route('/user/add').post(userController.sinscrire);
router.route('/user/connexion').post(userController.connexion);
router.route('/user/admin').post(userController.isAdmin);

module.exports = router;