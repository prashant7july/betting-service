const config = require('./../config/config');
var { expressjwt: jwt } = require("express-jwt")

//module.exports = expressJwt({ secret: config.jwtSecret })
module.exports = jwt({ secret: config.jwtSecret, algorithms: ["HS256"] })