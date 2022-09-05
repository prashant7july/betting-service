const httpStatus = require('http-status');
const AuthService = require('./../services/auth-service');
const get = require('lodash/get');
const ApiError = require('./../helpers/api-error');
const config = require('./../config/config');

const parseToken = authorization => {
  if (typeof authorization === 'string') {
    const contents = authorization.split(' ')
    if (contents[1]) {
      return contents[1]
    } else {
      throw new ApiError('Token was not provided', httpStatus.UNAUTHORIZED)
    }
  } else {
    throw new ApiError('Token was not provided', httpStatus.UNAUTHORIZED)
  }
}

module.exports = async function(req, res, next) {
  try {
    if (config.env === 'test') return next()
    const token = parseToken(req.headers.authorization)
    const response = await AuthService.getUser(token)
    const user = get(response, 'data.user')

    if (!user.is_verified) {
      throw new ApiError(
        'Your account is not verified.',
        httpStatus.UNAUTHORIZED
      )
    }

    if (!user.is_active) {
      throw new ApiError('Your account is not active.', httpStatus.UNAUTHORIZED)
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
