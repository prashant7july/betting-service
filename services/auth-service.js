const handleErrorResponse = require('./../helpers/response-error');
const HttpClient = require('./../helpers/create-http-client');
const config = require('./../config/config');

async function getUser(token) {
  try {
    const request = HttpClient(
      { baseURL: config.auth_url },
      { Authorization: 'Bearer ' + token }
    )
    return await request.get('/user/profile')
  } catch (error) {
    return handleErrorResponse(error)
  }
}

module.exports = { getUser }
