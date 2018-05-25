'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require(global.PATH_ROUTES)
const exphbs = require('express-handlebars')
const path = require('path')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/api',api)

//Handlebars setup
/*
app.engine('hbs', exphbs({
    extname: 'hbs'
}))

//public

app.use(express.static(global.PATH_PUBLIC))

//View Engine Setup

app.set('views', global.PATH_VIEWS)
app.set('view engine', 'hbs')

app.get('/', (req,res) => {
    res.render('index',{
        layout:false
    })
})
*/
module.exports = app
