'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const UserSchema = Schema({
    displayName: String,
    mail: {type: String, unique: true, lowercase: true},
    resources: Array,
    level: Number,
    password: {type: String},
    token: String,
    currentWorld: Number,
    rol: String
})

/*
UserSchema.pre('save', (next)=> {
    let user = this
    //if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null,(err,hash) =>{
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
})
*/
UserSchema.methods.gravatar = function (){
    if(!this.mail) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.mail).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
