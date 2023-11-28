require('dotenv').config()
const { PrismaClient}=require('@prisma/client')
const prisma = new PrismaClient();
const Sentry=require("@sentry/node")
const {ProfilingIntegration}=require("@sentry/profiling-node")
const express=require('express')
const app = new express()
const port=3000;
const path=require('path')
const flash=require('express-flash')
const session=require('express-session')
const routers=require('./router')
const swaggerJSON = require('./openapi.json')
const swaggerUI=require('swagger-ui-express');
const passport = require('./utils/passport');
const ejs=require('ejs')
const morgan=require('morgan')

const nodemailer=require('nodemailer')


const {sendMail,sendMailHTML} = require('./libs/mailer')

app.use(morgan('combined'))
app.get('/',function(req,res){
    res.send('hello world')
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'./app/view'))

Sentry.init({
    dsn: 'https://3285796e1ebb8a2973821ef7173be5b7@o4506258327601152.ingest.sentry.io/4506258629853184',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.post('/email', async (req, res) => {
  const { email } = req.body;
  // sendMail(email, `Halo ${name}`, 
  //   `Terima kasih sudah mendaftar di aplikasi kami! Silahkan klik
  //    link berikut untuk proses verifikasi email anda`
  // )

  const user = await prisma.user.findUnique({
    where: {
        email: email,
    }
  })
  
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < 13; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // console.log(result)
  if(user){
    // console.log(user)
    // console.log('masuk')
    const update= await prisma.user.update({
      where :{
          email: email
      },
      data:{
          tokenReset: result
      }
  });
  // if(update){
  //   console.log(update)
  // }
  }
  const base_url=req.protocol+"://"+req.headers.host
  ejs.renderFile(__dirname+"/templates/email.ejs",
  {url:base_url+'/auth/users/resetpassword/'+result+'/'+email},function(err,data){
    if(err){
      console.log(err)
    }else{
      sendMailHTML(email,`Halo ${email}`,data)
    }
  })
  res.status(200).json({
    status: 'ok',
    message: `Silahkan cek email 
    untuk verifikasi`
  })
})


app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSON))
app.use(routers)

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  app.use(Sentry.Handlers.errorHandler());
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

app.listen(port, () => 
    console.log(`Server runs at http://localhost:${port}`))

module.exports=app