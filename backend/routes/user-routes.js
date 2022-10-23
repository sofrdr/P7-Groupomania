const express = require('express')
const userCtrl = require('../controllers/user-controller')
const router = express.Router();

const rateLimit = require('express-rate-limit');

// Limite de 5 tentatives de connexion par fenêtre de 5 minutes
const limiterLogin = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Trop de tentatives infructueuses de connexion, veuillez réessayer plus tard.",
    statusCode: 429,
    standardHeaders: true, 
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({error: options.message})
    }
})

// Limite de 10 tentatives de création de compte par fenêtre de 5 minutes
const limiterSignup = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "Trop de tentatives de création de compte depuis cette adresse IP, veuillez réessayer plus tard.",
    statusCode: 429,
    standardHeaders: true, 
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({error: options.message})
    }
})

router.post('/signup', limiterSignup, userCtrl.signup);
router.post('/login', limiterLogin, userCtrl.login);

module.exports = router;