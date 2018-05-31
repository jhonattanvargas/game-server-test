const services = require(global.PATH_SERVICES)

module.exports = (server) => {
    
    const io = require('socket.io')(server)
    const data = {
        onlines: new Array()
    }

    const updateResources = require(global.PATH_IO+'updateResources')(data.onlines, io)

    setInterval(updateResources,20000)


    io.on('connection', socket => {
        console.log('id',socket.id)
        let token = socket.handshake.query.token == undefined ? null : socket.handshake.query.token
        let user = null
        //log for register on console
        console.log('connect',token)
        if(token != null && token != 'null'){
            user = data.onlines.find(x => x.token == token)
            socket.join(token)
            if(user != null){
                data.onlines.map(x => x.token == user.token ? x.total_tab ++ : null)
            }else{
                data.onlines.push({token:token, total_tab: 1})
            }
        }
        io.sockets.emit('onlines',data.onlines.length)

        socket.on('disconnect', () => {     
            //log for register on console   
            console.log('disconnect',token)
            user = data.onlines.find(x => x.token == token)
            if(user != null){
                socket.leave(token)
                data.onlines.map( (x,i) => {
                    if(x.token == user.token)
                        x.total_tab --
                    if(x.total_tab == 0){
                        data.onlines.splice(i,1)
                        io.sockets.emit('onlines',data.onlines.length)
                    }
                        
                })
            }else{
                console.log('uff',user)
            }            
        })

        socket.on('hola', msg => {
            console.log(msg)
        })
    })

    /*
    io.on('connection', (socket) => {
    console.log("Session: ", socket);
    let user = socket.handshake.session.passport == undefined ? undefined : socket.handshake.session.passport.user
    if(user != undefined && globalData.onlines.find(x => x.id == user.id) == null ){
        globalData.onlines.push({id:user.id,displayName:user.displayName,total_tab:1})    	
        io.sockets.emit('globalData',globalData)
    }else{
        globalData.onlines.map(x => x.id == user.id ? x.total_tab ++ : null)
    }

    socket.on('disconnect', () => {
        if(user != undefined){
            globalData.onlines.forEach( (x,i) => {
                if(x.id == user.id)
                    if(x.total_tab > 1)
                        x.total_tab --
                    else
                        globalData.onlines.splice(i,1)
            })
            io.sockets.emit('globalData',globalData)
        }    		
    })
    })
    */
    return io
    }