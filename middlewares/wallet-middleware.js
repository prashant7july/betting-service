const get = require('lodash/get');

const walletService = require('./../services/wallet-service');

module.exports = async function(req, res, next) {
  try {
    const user = req.user

    const response = await walletService.getUserWallet(user._id)

    req.user.wallet = get(response, 'data.wallet', {})

    next()
  } catch (error) {
    next(error)
  }
}