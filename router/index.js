const express=require('express');
const router=express.Router();
const users =require('./users');
const bank_accounts =require('./bank_accounts');
const transactions =require('./transactions');

router.use(users);
router.use(bank_accounts);
router.use(transactions);

module.exports=router;