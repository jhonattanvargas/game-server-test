'use strict'

const config = require('./config')
const mongoose = require('mongoose')
const app = require('./app')
mongoose.Promise = global.Promise

mongoose.connect(config.db.url, (err, res)=> {
    if (err) throw err
    console.log('conexión establecida')
})

app.listen(config.port, ()=>{
    console.log(`corriendo en el puerto ${config.port}`)
})