const httpStatus = require('http-status');
const ApiError = require('./../helpers/api-error');

module.exports = async function(req, res, next) {
  try {
    const user = req.user

    if (!user.is_verified) {
      throw new ApiError(
        'Your account is not verified.',
        httpStatus.UNAUTHORIZED
      )
    }

    if (!user.is_active) {
      throw new ApiError('Your account is not active.', httpStatus.UNAUTHORIZED)
    }

    next()
  } catch (error) {
    next(error)
  }
}
