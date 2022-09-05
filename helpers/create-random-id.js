const shortId = require('shortid');

module.exports = function() {
  const dateObj = new Date()
  const month = dateObj.getUTCMonth() + 1
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()

  return `${shortId.generate()}${year}${month}${day}`.toUpperCase()
}
