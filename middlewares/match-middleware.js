const get = require('lodash/get');

const EventService = require('./../services/event-service');

module.exports = async function(req, res, next) {
  try {
    const response = await EventService.findMatch(req.body.match_id)

    const match = get(response, 'data.match')

    req.match = match

    next()
  } catch (error) {
    next(error)
  }
}
