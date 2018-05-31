'use strict'

const mongoose = require('mongoose')
const World = require(global.PATH_MODELS+'world')
const User = require(global.PATH_MODELS+'user')
const services = require(global.PATH_SERVICES)

function addUser (req, res){

    console.log('addUser')

    if(req.rol !== 'admin')
        res.status(401).send({message:'Authorization needed'})
    
    let id = req.params.id
    let userId = req.body.userId

    console.log('id',id)
    console.log('userId',userId)

    World.findOne({_id:id}, (err,world)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!world) return res.status(404).send({message:`world dont exist`})

        User.findOne({_id:userId}, (err,user)=>{
            if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
            if(!user) return res.status(404).send({message:`user dont exist`})
    
            if(world.users.find( u => u._id == user._id) != null)
                res.status(500).send({message:`an Error has ocurred: the user exist in the world`})
            else{
                world.users.push(user)
                world.save(err => {
                    if(err) res.status(500).send({message:`Error on create world: ${err}`})
                    
                    return res.status(200).send({world})
                })
            }                
        })

        
    })
}

function removeUser (req, res){
    
    if(req.rol !== 'admin')
        res.status(401).send({message:'Authorization needed'})
    
    let id = req.params.id
    let userId = req.params.userId
    World.findOne({_id:id}, (err,world)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!world) return res.status(404).send({message:`world dont exist`})
        let flag = false
        world.users.map( (u,i) => {
            if(u._id == userId){
                world.users.splice(i,1)
                flag = true
            }                    
        })

        if(flag){
            world.save(err => {
                if(err) res.status(500).send({message:`Error on create world: ${err}`})
                return res.status(200).send({message:`user removed`})                    
            })                
        }
        else
            return res.status(404).send({message:`user dont exist in world`})

    })
}

function getUsers (req, res){
    
    if(req.rol !== 'admin')
        res.status(401).send({message:'Authorization needed'})
    
    let id = req.params.id
    World.findOne({_id:id}, (err,world)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!world) return res.status(404).send({message:`world dont exist`})

        //change, dont send a password
        res.status(200).send({users:world.users})
    })
}


module.exports = {
    addUser,
    removeUser,
    getUsers
}