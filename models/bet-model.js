const mongoose = require('mongoose');
const mongooseTimestamp = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const { BET, BETTING_STATUSES } = require('./../constants')

mongoosePaginate.paginate.options = {
  docsKey: 'items'
}

require('mongoose-currency').loadType(mongoose)
require('mongoose-double')(mongoose)

const Currency = mongoose.Types.Currency

const Schema = mongoose.Schema

var BetSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    match_id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    match_odd_id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true
    },
    transaction_id: {
      type: Schema.Types.ObjectId,
      index: true,
      unique: true
    },
    reference_number: {
      type: String,
      index: true,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: BETTING_STATUSES,
      index: true,
      default: BET
    },
    betting_amount: {
      type: Currency,
      required: true,
      min: 0
    },
    winning_amount: {
      type: Currency,
      required: true,
      min: 0
    },
    profit: {
      type: Currency,
      required: true,
      min: 0
    },
    odd: {
      type: Schema.Types.Double,
      required: true,
      default: 1.0
    }
  },
  { versionKey: false }
)

BetSchema.plugin(mongoosePaginate)

BetSchema.plugin(mongooseTimestamp)

module.exports = mongoose.model('Bet', BetSchema)
