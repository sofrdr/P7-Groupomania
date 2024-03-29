require('dotenv').config({path: '../config/.env'});
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {createUser, getUserByEmail} = require('../models/user-model')


// -------------- CREER UN COMPTE -----------------------

exports.signup = async (req, res) => {

    const { email, password, pseudo } = req.body;
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
            return res.status(401).send({ error: 'Le mot de passe doit contenir au moins 8 caractères, un chiffre, une majuscule et un caractère spécial' });
            
        } else if (pseudo === "" || validator.matches(pseudo, /^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/
        ) === false) {
            return res.status(401).send({ error: 'Merci de saisir un pseudo entre 3 et 20 caractères' })
        }else {
            // Cryptage du mot de passe
            const hash = await bcrypt.hash(password, 12);
            // Ajout de l'utilisateur en BDD       
            createUser(email, hash, pseudo);
            // On récupère l'id et l'email de l'utilisateur
            const newUser = getUserByEmail(email)
            res.status(201).json({
                userId : newUser.id,
                email: newUser.email,

            });
        }

    }
    catch (err) {
        let errorMessage 
        if(err.message === "UNIQUE constraint failed: users.email"){
            errorMessage = "Un compte existe déjà avec cette adresse email"
        }
        if(err.message === "UNIQUE constraint failed: users.pseudo"){
            errorMessage = "Ce pseudo est déjà utilisé"
        }
        res.status(400).json({ error : errorMessage ? errorMessage : err.message});
        console.log(err)
    }

}


// --------------- SE CONNECTER ---------------------------------

exports.login = async (req, res) => {

    const {email, password} = req.body;


    // On empêche l'envoi des caractères <, >, &, ', " et /
    const emailSanitized = validator.escape(email)

    // On récupère l'utilisateur dans la BDD
    const user = getUserByEmail(emailSanitized)
    console.log(user)
      
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
            user : {
                pseudo: user.pseudo
            },
            token : jwt.sign(
                { 
                    userId : user.id,
                    isAdmin : user.role
                },
                SECRET_KEY, 
                {expiresIn: "1h"}
            )
        })
    }
    catch(err){
        console.log(err)
        res.status(err.status || 500).json({err});
    }
}

