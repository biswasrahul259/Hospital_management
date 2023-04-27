const jwt = require('jsonwebtoken')
const config = require('../config/config')

const verifyToken = (req, res,next) => {
    const token = req.body.token || req.query.token || req.headers["x-acess-token"]
    
    try {
        const tokenVerify = jwt.verify(token, config.secretKey)
        console.log(tokenVerify);
        req.user= tokenVerify
        // return 
        // console.log(tokenVerify);
    } catch (error) {
        console.log(error);
    }
    return next()
}

module.exports=verifyToken