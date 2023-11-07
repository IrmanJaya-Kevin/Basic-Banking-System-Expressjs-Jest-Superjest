const express = require('express');
const router = express.Router();
// const {get,getById,create,destroy,update} =require('../app/controller/users')
const controller=require('../app/controller')




router.get('/api/v1/users', controller.usersV1.get)
router.get('/api/v1/users/:userId', controller.usersV1.getById)
// router.put('/api/v1/users/:userId', controller.usersV1.update)
router.post('/api/v1/users', controller.usersV1.create)
router.delete('/api/v1/users/:userId', controller.usersV1.destroy)


module.exports = router;