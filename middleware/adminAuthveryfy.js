const jwt = require("jsonwebtoken");
// const adminConfig=require("../config/adminConfig")
exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, "Rahul-19956@admin", (err, data) => {
            req.admin = data
            //console.log("fine...", req.admin);
            next()
        })
    } else {
       // console.log("Something went wrong");
        next()
    }
}

