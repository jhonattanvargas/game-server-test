'use strict'

const express = require('express')
const api = express.Router()
const auth = require(global.PATH_MIDDLEWARES+'auth')

//controllers
const UserCtrl = require(global.PATH_CONTROLLERS+'user')

//routes
api.post('/signup', UserCtrl.signUp)
api.post('/signin',UserCtrl.signIn)
api.get('/resources', auth, UserCtrl.getResources)

api.get('/private', auth, function(req, res){
    res.status(200).send({message:'Access granted'})
})

module.exports = api
