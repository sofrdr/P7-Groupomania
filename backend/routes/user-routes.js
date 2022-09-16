const express = require('express')
const userCtrl = require('../controllers/user-controller')
const router = express.Router();

const rateLimit = require('express-rate-limit');
// Limite de 3 tentatives de connexion par fenêtre de 5 minutes
const limiterLogin = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: "Trop de tentatives infructueuses de connexion, veuillez réessayer plus tard.",
    standardHeaders: true, 
    legacyHeaders: false,
})

// Limite de 10 tentatives de création de compte par fenêtre de 5 minutes
const limiterSignup = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "Trop de comptes créés depuis cette adresse IP, veuillez réessayer plus tard.",
    standardHeaders: true, 
    legacyHeaders: false,
})

router.post('/signup', limiterSignup, userCtrl.signup);
router.post('/login',  userCtrl.login);
router.get('/logout', userCtrl.logout)

module.exports = router;