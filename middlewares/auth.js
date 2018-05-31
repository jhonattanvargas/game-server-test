'use strict'

const services = require(global.PATH_SERVICES)
const User = require(global.PATH_MODELS+'user')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'do not have autorization'})
    }

    const token = req.headers.authorization.split(' ')[1]
    
    services.decodeToken(token)
        .then( payload => {
            //console.log('payload', payload)
            req.user = payload.sub
            req.rol = payload.rol
            
            next()
        })
        .catch(response => {
            res.status(response.status).send({message: response.message})
        })
}

module.exports = isAuth