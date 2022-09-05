const path = require('path')

module.exports = {
  apps: [
    {
      name: 'BETTING-API',
      script: path.resolve(__dirname, './index.js'),
      env: {
        NODE_PATH: path.resolve(__dirname, './')
      }
    }
  ]
}
