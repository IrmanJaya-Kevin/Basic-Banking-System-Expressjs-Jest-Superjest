// const users = require('./api/v1/users');
const usersV1 = require('./api/v1/users');
const bank_accountsV1 = require('./api/v1/bank_accounts');
const transactionsV1 = require('./api/v1/transactions');
const auth = require('./api/v1/auth');
const media = require('./api/v1/media');

module.exports = {
    // users,
    usersV1,
    bank_accountsV1,
    transactionsV1,
    auth,
    media
}