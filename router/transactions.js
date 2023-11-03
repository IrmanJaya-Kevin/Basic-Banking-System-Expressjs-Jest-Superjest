const express = require('express');
const router = express.Router();
const controller=require('../app/controller')


router.get('/api/v1/transactions', controller.transactionsV1.get)
router.get('/api/v1/transactions/:transactionId', controller.transactionsV1.getById)
router.post('/api/v1/transactions', controller.transactionsV1.create)

module.exports = router;