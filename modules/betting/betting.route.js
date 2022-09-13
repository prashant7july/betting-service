const { Router } = require('express');
const { body, _ } = require('express-validator');
const requireAdmin = require('./../../middlewares/admin-middleware');
const requireAuth = require('./../../middlewares/jwt-middleware');
const requireActive = require('./../../middlewares/status-middleware');
const requireOwnership = require('./../../middlewares/owns-middleware');
const requireWalletCheck = require('./../../middlewares/wallet-middleware');
const requireMatch = require('./../../middlewares/match-middleware');
const config = require('./../../config/config');
const bettingValidator = require('./betting.validator');
const bettingCtrl = require('./betting.controller');

const router = Router()

router
  .route('/return/:transaction_id')
  .post(
    requireAuth,
    requireActive,
    requireAdmin,
    body(bettingValidator.updateResults),
    bettingCtrl.returnBet
  )

router
  .route('/returns/:match_id')
  .post(
    requireAuth,
    requireActive,
    requireAdmin,
    body(bettingValidator.updateResults),
    bettingCtrl.updateReturns
  )

router
  .route('/winners/:match_id')
  .post(
    requireAuth,
    requireActive,
    requireAdmin,
    body(bettingValidator.updateResults),
    bettingCtrl.updateWinners
  )

router
  .route('/losers/:match_id')
  .post(
    requireAuth,
    requireActive,
    requireAdmin,
    body(bettingValidator.updateResults),
    bettingCtrl.updateLosers
  )

// LIST ALL BETS
router
  .route('/')
  .get(requireAuth, requireActive, requireAdmin, bettingCtrl.index)

// LIST USER BETS
router
  .route('/:user_id')
  .get(requireAuth, requireActive, requireOwnership, bettingCtrl.user)

// USER PLACE BET
router
  .route('/:user_id')
  .post(
    body(bettingValidator.create),
    requireAuth,
    requireActive,
    requireOwnership,
    requireWalletCheck,
    requireMatch,
    bettingCtrl.create
  )

// SHOW USER BET
router
  .route('/:user_id/:id')
  .get(requireAuth, requireActive, requireOwnership, bettingCtrl.find)

// ADMIN UPDATE USER BET
router
  .route('/:id')
  .post(
    body(bettingValidator.update),
    requireAuth,
    requireActive,
    requireAdmin,
    bettingCtrl.update
  )

// ADMIN DELETE USER BET
router
  .route('/:id')
  .post(requireAuth, requireActive, requireAdmin, bettingCtrl.destroy)

module.exports = router
