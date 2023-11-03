const express=require('express');
const router=express.Router();
const users =require('./users');
const bank_accounts =require('./bank_accounts');
const transactions =require('./transactions');
const auth =require('./auth');

router.use(users);
router.use(bank_accounts);
router.use(transactions);
router.use(auth);

module.exports=router;