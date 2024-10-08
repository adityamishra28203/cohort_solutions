const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config')

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const tokenArray = token.split(" "); //to make array of token: "Bearer", "actual token"
    const jwtToken  = tokenArray[1]; //to use token
    try {
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {

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
    
};

module.exports = adminMiddleware;