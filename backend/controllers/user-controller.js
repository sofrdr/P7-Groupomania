require('dotenv').config({path: '../config/.env'});
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {createUser, getUserByEmail} = require('../models/user-model')
//const { v4: uuidv4} = require('uuid'); 





exports.signup = async (req, res) => {

    const { email, password } = req.body;
    try {
        // Vérification de la validité de l'adresse mail
        if (validator.isEmail(email) === false) {
            return res.status(401).send({ error: 'Adresse mail invalide' });
        
        /* On définit un schéma obligatoire pour le mot de passe :
        - 8 caractères min
        - 1 majuscule
        - 1 minuscule
        - 1 chiffre
        - 1 caractère spécial
        */
        } else if (validator.matches(password, /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/gm) === false) {
            return res.status(401).send({ error: 'Le mot de passe doit contenir au moins 8 caratères, un chiffre, une majuscule et un caractère spécial' });
        } else {
            // Cryptage du mot de passe
            const hash = await bcrypt.hash(password, 12);
            // Ajout de l'utilisateur en BDD       
            createUser(email, hash);
            // On récupère l'id et l'email de l'utilisateur
            const newUser = getUserByEmail(email)
            res.status(201).json({
                userId : newUser.id,
                email: newUser.email,

            });
        }

    }
    catch (err) {
        res.status(400).json({ err });
    }

}


exports.login = async (req, res) => {

    const {email, password} = req.body;

    // On récupère l'utilisateur dans la BDD
    const user = getUserByEmail(email)
      
    try{
        // Si aucun utilisateur ne correspond à l'adresse mail de la requête on renvoie une erreur
        if(user === undefined){
            return res.status(401).json({error: "Adresse mail ou mot de passe incorrect"})
        }

        // Si le mot de passe ne correspond pas à l'email en BDD alors on renvoie une erreur
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(401).json({error: 'Adresse mail ou mot de passe incorrect'})
        }
        
        // Sinon création d'un token d'authentification valable 1h
        return res.status(200).json({
            userId : user.id,
            token : jwt.sign(
                { userId : user.id},
                SECRET_KEY, 
                {expiresIn: '1h'}
            )
        })
    }
    catch(err){
        console.log(err)
        res.status(err.status || 500).json({err});
    }
}

exports.logout = (req, res) => {
    res.redirect('/')
}