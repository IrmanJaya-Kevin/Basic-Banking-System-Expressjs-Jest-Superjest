const express = require('express');
const router = express.Router();
const controller=require('../app/controller')

const {auth}=require('../utils/jwt')

const passport=require('../utils/passport')

const passportOAUTH = require('../utils/oauth');

router.post('/api/v1/auth/login', controller.auth.login)
router.post('/api/v1/auth/register', controller.auth.register)
router.post('/api/v1/auth/whoami', auth,controller.auth.whoami)


router.get('/register',(req,res)=>{
    res.render('register.ejs')
})
router.get('/auth/users/resetpassword/:resetToken/:email',(req,res)=>{
    const token=req.params.resetToken
    const email=req.params.email
    res.render('changePassword.ejs',{token:token,email:email})
})

router.post('/changePassword',controller.auth.changePassword)


router.post('/register',controller.auth.registerForm)

router.get('/login',(req,res)=>{
    res.render('login.ejs')
})
router.get('/forgotpassword',(req,res)=>{
    res.render('forgotPassword.ejs')
})
router.post('/login',passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/login'
}))

router.get('/auth/google', 
    passportOAUTH.authenticate('google', {
        scope: ['profile', 'email']
    })
)
router.get('/api/auth/callback/google', 
    passportOAUTH.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }), controller.auth.oauth
)

module.exports = router;