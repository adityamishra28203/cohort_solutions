const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const tokenArray = token.split(" "); //to make array of token: "Bearer", "actual token"
    const jwtToken  = tokenArray[1]; //to use token
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch(e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
}


module.exports = userMiddleware;