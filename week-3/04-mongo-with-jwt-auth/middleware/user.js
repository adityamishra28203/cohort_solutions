const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const tokenArray = token.split(" "); //to make array of token: "Bearer", "actual token"
    const jwtToken  = tokenArray[1]; //to use token
    const decodedToken = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedToken.username){
        next();
    }else{
        res.status(403).json({
            msg: "Incorrect username or password"
        })
    }
}


module.exports = userMiddleware;