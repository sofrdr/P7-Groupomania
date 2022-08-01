const express = require('express')
const userCtrl = require('../controllers/user-controller')
const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout)

module.exports = router;