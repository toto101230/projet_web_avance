const express = require('express');
const userController = require('../controllers/controllerUtilisateur');

const router = express.Router();

router.route('/user/add').post(userController.sinscrire);
router.route('/user/connexion').post(userController.connexion);
router.route('/user/admin').post(userController.isAdmin);
router.route('/user/getUtilisateur').post(userController.getUtilisateur);
router.route('/user/majAddress').post(userController.majAddress);

module.exports = router;