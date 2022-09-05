// MESSAGES
const MSG_INSUFFICIENT_BALANCE = 'Insufficient balance'
const MSG_USER_NOTFOUND = 'User not found'
const MSG_WALLET_NOTFOUND = 'Wallet not found'
const MSG_TRANSACTION_NOTFOUND = 'Transaction not found'
const MSG_TRANSACTION_FAILED = 'Transaction is already failed.'
const MSG_TRANSACTION_ARCHIVED = 'Cannot archive a pending transaction.'
const MSG_MATCH_CLOSE = 'Match no longer accepting any bets.'
const MSG_ODD_NOTFOUND = 'This odd does not exists.'

const MINIMUM_BETTING_AMOUNT = 20
const ALLLOWED_BETTING_AMOUNT = [20, 50, 100, 1000]

// STRINGS
const COMPLETED = 'completed'
const PENDING = 'pending'
const FAILED = 'failed'

// STRINGS
const DEBIT = 'debit'
const CREDIT = 'credit'

const WITHDRAW = 'withdraw'
const DEPOSIT = 'deposit'
const ADJUSTMENT = 'adjustment'
const BET = 'bet'
const WIN = 'win'
const LOSE = 'lose'
const RETURNED = 'returned'

const PAYMENT_STATUSES = [PENDING, COMPLETED, FAILED]
const BETTING_STATUSES = [BET, WIN, LOSE, RETURNED]

module.exports = {
    // MESSAGES
    MSG_INSUFFICIENT_BALANCE,
    MSG_USER_NOTFOUND,
    MSG_WALLET_NOTFOUND,
    MSG_TRANSACTION_NOTFOUND,
    MSG_TRANSACTION_FAILED,
    MSG_TRANSACTION_ARCHIVED,
    MSG_MATCH_CLOSE,
    MSG_ODD_NOTFOUND,

    MINIMUM_BETTING_AMOUNT,
    ALLLOWED_BETTING_AMOUNT,

    // STRINGS
    COMPLETED,
    PENDING,
    FAILED,

    // STRINGS
    DEBIT,
    CREDIT,

    WITHDRAW,
    DEPOSIT,
    ADJUSTMENT,
    BET,
    WIN,
    LOSE,
    RETURNED,

    PAYMENT_STATUSES,
    BETTING_STATUSES
}