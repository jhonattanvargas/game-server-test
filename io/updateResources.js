const User = require(global.PATH_MODELS+'user')
const services = require(global.PATH_SERVICES)
const bcrypt = require('bcrypt-nodejs')

module.exports = (onlines, io) => {
    return function process(){
        console.log('updated resources')
        onlines.map( x => {
            let payload = services.getPayload(x.token)
            //console.log('payload', payload)
            User.findById(payload.sub, (err, user) =>{
                if(err) throw err
        
                user.resources.map(r => {
                    r.current ++
                })

                User.findByIdAndUpdate(user._id,user,{new: true}, (err,userUpdated)=>{
                    if(err) throw err
                    //console.log('updated',userUpdated)
                    //change for personal current values
                    io.to(x.token).emit('resources',user.resources)
                })
            })
        })
    }       
}