const express = require('express')
const userCtrl = require('../controllers/user-controller')
const router = express.Router();

router.post('/signup', userCtrl.signup);
//Router.post('/login', userCtrl.login);

module.exports = router;