const express = require('express');
const userController = require('../controllers/controller');

const router = express.Router();

router.route('/add')
    //.get(userController.indexUser)
    .post(userController.storeProduct);



module.exports = router;