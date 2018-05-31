'use strict'

const express = require('express')
const api = express.Router()
const auth = require(global.PATH_MIDDLEWARES+'auth')

//controllers
const UserCtrl = require(global.PATH_CONTROLLERS+'user')
const WorldCtrl = require(global.PATH_CONTROLLERS+'world')
const WorldUserCtrl = require(global.PATH_CONTROLLERS+'worldUser')

//routes

//user
api.post('/signup', UserCtrl.signUp)
api.post('/signin', UserCtrl.signIn)
api.get('/resources', auth, UserCtrl.getResources)
api.get('/user/data/:id', auth, UserCtrl.getUserData)

//world
api.post('/world', auth, WorldCtrl.saveWorld)
api.get('/world/:id', auth, WorldCtrl.getWorld)
api.get('/world', auth, WorldCtrl.getWorlds)

//worldUsers
api.post('/world/:id/user/', auth, WorldUserCtrl.addUser)
api.get('/world/:id/user/', auth, WorldUserCtrl.getUsers)
api.delete('/world/:id/user/:userId', auth, WorldUserCtrl.removeUser)


api.get('/private', auth, function(req, res){
    res.status(200).send({message:'Access granted'})
})

module.exports = api
