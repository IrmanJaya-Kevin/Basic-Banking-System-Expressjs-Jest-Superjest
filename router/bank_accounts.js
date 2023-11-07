const express = require('express');
const router = express.Router();
const controller=require('../app/controller')


router.get('/api/v1/accounts', controller.bank_accountsV1.get)
router.get('/api/v1/accounts/:accountId', controller.bank_accountsV1.getById)
router.post('/api/v1/accounts', controller.bank_accountsV1.create)
router.delete('/api/v1/account/:accountId', controller.bank_accountsV1.destroy)

module.exports = router;