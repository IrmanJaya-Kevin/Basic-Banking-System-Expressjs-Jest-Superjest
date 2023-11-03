const express=require('express')
const app = new express()
const port=3000;
const routers=require('./router/users')
const swaggerJSON = require('./openapi.json')
const swaggerUI=require('swagger-ui-express')


app.use(express.json())

app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSON))
app.use(routers)

app.listen(port, () => 
    console.log(`Server runs at http://localhost:${port}`))

module.exports=app