const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/users', apiController.users);
// router.post('/users', apiController.addData);

module.exports = router;