const HttpClient = require('./../helpers/create-http-client');
const createAdminToken = require('./../helpers/create-admin-token');
const handleErrorResponse = require('./../helpers/response-error');
const config = require('./../config/config');

const request = HttpClient(
  { baseURL: config.wallets_url },
  { Authorization: `Bearer ${createAdminToken()}` }
)

async function getWallets(params = {}) {
  try {
    return await request.get('/api/wallet', params)
  } catch (error) {
    return handleErrorResponse(error)
  }
}

async function getUserWallet(userId) {
  try {
    return await request.get(`/api/wallet/${userId}`)
  } catch (error) {
    console.error(error)
    return handleErrorResponse(error)
  }
}

async function createWallet(userId, params = {}) {
  try {
    return await request.post(`/api/wallet/${userId}`, params)
  } catch (error) {
    return handleErrorResponse(error)
  }
}

async function updateWallet(userId, params = {}) {
  try {
    return await request.put(`/api/wallet/${userId}`, params)
  } catch (error) {
    return handleErrorResponse(error)
  }
}

async function destroyWallet(userId) {
  try {
    return await request.delete(`/api/wallet/${userId}`)
  } catch (error) {
    return handleErrorResponse(error)
  }
}

module.exports = {
  getWallets,
  getUserWallet,
  createWallet,
  updateWallet,
  destroyWallet
}
