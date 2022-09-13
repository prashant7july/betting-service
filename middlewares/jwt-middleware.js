const config = require('./../config/config');
var { expressjwt: jwt } = require("express-jwt")

// Error: secret should be set - config.js check and check the .env path
module.exports = jwt({ secret: config.jwtSecret, algorithms: ["HS256"] })