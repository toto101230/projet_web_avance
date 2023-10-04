const express = require('express');
const userController = require('../controllers/controllerUtilisateur');

const router = express.Router();

router.route('/user/add').post(userController.sinscrire);

module.exports = router;