'use strict'

const mongoose = require('mongoose')
const User = require(global.PATH_MODELS+'user')
const services = require(global.PATH_SERVICES)
const bcrypt = require('bcrypt-nodejs')

function signUp (req, res){
    const user = new User({
        mail: req.body.mail,
        displayName: req.body.displayName,
        level: 1,
        resources: [
            {
                name:'food',
                current: 0,
                max: 0
            },
            {
                name:'wood',
                current: 0,
                max: 0
            }
        ],
        rol: 'user'
    })

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)

        bcrypt.hash(req.body.password, salt, null,(err,hash) =>{
            if(err) return next(err)

            user.password = hash
        })
    })

    user.save(err => {
        if(err) res.status(500).send({message:`Error on create user: ${err}`})

        return res.status(200).send({token: services.createToken(user)})
    })
}

function signIn (req, res){
    //console.log(req.body)
    User.findOne({mail: req.body.mail}, (err, user)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!user) return res.status(404).send({message:`user dont exist`})

        bcrypt.compare(req.body.password, user.password, function(error, response) {
            if(error) return res.status(500).send({message:`an Error has ocurred: ${error}`})

            if(response){
                req.user = user
                res.status(200).send({
                    message: `logIn successful`,
                    resources: user.resources,
                    level: user.level,
                    token: services.createToken(user)
                })
            }else{
                return res.status(404).send({message:`password dont match`})
            }
        })
    })
}

function getResources(req, res){    
    //console.log('user',req.user)        
    User.findOne({_id:req.user}, (err,user)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!user) return res.status(404).send({message:`user dont exist`})

        res.status(200).send({
            resources: user.resources
        })
    })
}

function getUserData(req, res){
    //console.log('user',req.user)        
    User.findOne({_id:req.user}, (err,user)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!user) return res.status(404).send({message:`user dont exist`})

        res.status(200).send({
            user:{
                resources: user.resources,
                displayName: user.displayName,
                level: user.level,
                currentWorld: user.currentWorld,
                rol: user.rol
            }
        })
    })
}

module.exports = {
    signIn,
    signUp,
    getResources,
    getUserData
}
