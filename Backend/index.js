const express = require('express')
const app=express()
const port = 5000
const mongoose = require('mongoose')
const connectToMongo = require('./db')
mongoose.set('strictQuery',true)
connectToMongo()
app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use('/api/products', require('./routes/product'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/order', require('./routes/order'))
app.use('/api/contact', require('./routes/contact'))

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(port, ()=>{
    console.log(`ShopNest backend listening at http://localhost:${port}`)
})
