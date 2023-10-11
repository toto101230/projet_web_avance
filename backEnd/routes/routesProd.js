const express = require('express');
const userController = require('../controllers/controllerProd');

const router = express.Router();

router.route('/add').post(userController.storeProduct);
router.route('/all').get(userController.tout);
router.route('/produit/:id').get(userController.getProd);

module.exports = router;