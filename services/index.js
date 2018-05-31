'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
        rol: user.rol
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
}

function decodeToken(token){
    const decode = new Promise( (resolve,reject)=>{
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'token was expired'
                })
            }
            resolve(payload)

        }catch(err){
            reject({
                status:500,
                message: 'Invalid Token'
            })
        }
    })

    return decode
}

function getPayload(token){
    const payload = jwt.decode(token, config.SECRET_TOKEN)
    if(payload.exp <= moment().unix()){
        return undefined
    }
    return payload
}

module.exports = {
    createToken,
    decodeToken,
    getPayload
}