const express = require('express');
const userController = require('../controllers/controllerCommande');

const router = express.Router();

router.route('/commander').post(userController.commander);

module.exports = router;