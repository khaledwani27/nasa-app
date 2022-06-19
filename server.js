// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const config = require('./server/config')
// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/NasaAppBD', { useNewUrlParser: true })
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

 
app.listen(config.PORT, function () {
    console.log(`Running on port ${config.PORT}`)
})

