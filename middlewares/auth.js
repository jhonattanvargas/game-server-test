'use strict'

const services = require(global.PATH_SERVICES)

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'do not have autorization'})
    }

    const token = req.headers.authorization.split(' ')[1]
    
    services.decodeToken(token)
        .then( response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send({message: response.message})
        })
}

module.exports = isAuth