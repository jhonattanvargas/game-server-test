'use strict'

const config = require('./config')
const mongoose = require('mongoose')
const app = require('./app')
const server = require('http').Server(app)
mongoose.Promise = global.Promise

mongoose.connect(config.db.url, (err, res)=> {
    if (err) throw err
    console.log('conexión establecida')
})

const io = require('./io')(server)

server.listen(config.port, ()=>{
    console.log(`corriendo en el puerto ${config.port}`)
})