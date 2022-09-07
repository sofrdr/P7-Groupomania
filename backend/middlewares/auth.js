require('dotenv').config({path: '../config/.env'});
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        console.log(decodedToken)
        const userId = decodedToken.userId;
        req.auth = {userId};
        if(req.body.userId && req.body.userId !== userId){
            throw res.status(403);
        }else{
            next();
        }
    }
    catch(error) {
        res.status(401).json({error : "Requête non authentifiée"});
    }
    
}