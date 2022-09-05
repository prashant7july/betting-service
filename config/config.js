const dotenv = require('dotenv');
const path = require('path');

const ENV_PATH =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, './../.test.env')
    : path.resolve(__dirname, './../.env')
    
dotenv.config({ path: ENV_PATH })

module.exports = {
  auth_url: process.env.AUTH_URL,
  wallets_url: process.env.WALLET_URL,
  events_url: process.env.EVENTS_URL,
  app_url: process.env.BETTING_URL,
  env: process.env.NODE_ENV,
  port: process.env.BETTING_PORT,
  mongooseDebug: process.env.BETTING_MONGOOSE_DEBUG,
  mongo: {
    host: process.env.BETTING_MONGO_HOST,
    port: process.env.BETTING_MONGO_PORT
  },
  jwtSecret: process.env.JWT_SECRET
}
