'use strict'

const mongoose = require('mongoose')
const World = require(global.PATH_MODELS+'world')
const services = require(global.PATH_SERVICES)
const bcrypt = require('bcrypt-nodejs')
const moment = require('moment-timezone')

function saveWorld (req, res){

    if(req.rol !== 'admin')
        res.status(401).send({message:'Authorization needed'})
    console.log(moment.tz(Date.now(), 'America/Santiago').format())
    const world = new World({
        displayName: req.body.displayName,
        levelMin: req.body.levelMin,
        levelMax: req.body.levelMax,
        users: [],
        created: moment.tz(Date.now(), 'America/Santiago').format(),
        opened: null,
        finished: null
    })

    world.save(err => {
        if(err) res.status(500).send({message:`Error on create world: ${err}`})
        
        return res.status(200).send({world})
    })
}

function getWorld (req, res){
    let id = req.params.id
    World.findOne({_id:id}, (err,world)=>{
        if(err) return res.status(500).send({message:`an Error has ocurred: ${err}`})
        if(!world) return res.status(404).send({message:`world dont exist`})

        res.status(200).send({
            world
        })
    })
}

function getWorlds(req, res){
    World.find({}, (err, worlds)=>{
        if(err) return res.status(500).send({message:`Error processing the request ${err}`})
        if(!worlds) return res.status(404).send({message: `no worlds were founds`})
        
        res.status(200).send({worlds})
    })
}


module.exports = {
    saveWorld,
    getWorld,
    getWorlds
}