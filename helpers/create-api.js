const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const express = require('express');
const expressValidation = require('express-validation');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const httpStatus = require('http-status');
const logger = require('morgan');
const methodOverride = require('method-override');
//const Raven = require('raven');

// const APIError, {
//   ModelNotFound,
//   InvalidArgumentException
// } = require('./api-error');
const APIError = require('./api-error');

module.exports = (app, config, routes, winstonInstance) => {
  if (config.env === 'development') {
    app.use(logger('dev'))
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(compress())
  app.use(methodOverride())
  app.use(helmet())
  app.use(cors())

  //Raven.config(config.raven_uri).install()

  const LOGGER_MSG =
    'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms'

  // enable detailed API logging in dev env
  if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body')
    expressWinston.responseWhitelist.push('body')
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg: LOGGER_MSG,
        colorStatus: true
      })
    )
  }

  app.get('/', (req, res) => res.send('OK'))

  app.use('/api', routes)

  app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
      return next(
        new APIError(
          'Unprocessable Entity',
          httpStatus.UNPROCESSABLE_ENTITY,
          err.errors.map(e => e.messages[0])
        )
      )
    } else if (err instanceof ModelNotFound) {
      return next(new APIError(err.message, httpStatus.NOT_FOUND))
    } else if (err instanceof InvalidArgumentException) {
      return next(new APIError(err.message, httpStatus.BAD_REQUEST))
    } else if (!(err instanceof APIError)) {
      const apiError = new APIError(err.message, err.status)
      return next(apiError)
    }
    return next(err)
  })

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND)
    return next(err)
  })

  if (config.env !== 'test') {
    app.use(
      expressWinston.errorLogger({
        winstonInstance
      })
    )
  }

  app.use((
    err,
    req,
    res,
    next // eslint-disable-line no-unused-vars
  ) => {
    const isServerError =
      err.status === httpStatus.INTERNAL_SERVER_ERROR || !err.status

    if (isServerError && config.env === 'production') {
      //Raven.captureException(err)
    }

    if (err.status === 500 && config.env === 'test') {
      console.error(err)
    }

    let status = err.status || httpStatus.INTERNAL_SERVER_ERROR
    let response = {
      status_code: status,
      message: err.message
    }

    if (err.errors && Object.keys(err.errors).length > 0) {
      response['errors'] = err.errors
    }

    return res.status(status).json(response)
  })

  return app
}
