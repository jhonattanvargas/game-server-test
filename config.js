global.APP_ROOT_PATH = __dirname + '/'
global.PATH_CONTROLLERS = APP_ROOT_PATH + 'controllers/'
global.PATH_MODELS = APP_ROOT_PATH + 'models/'
global.PATH_MIDDLEWARES = APP_ROOT_PATH + 'middlewares/'
global.PATH_ROUTES = APP_ROOT_PATH + 'routes/'
global.PATH_SERVICES = APP_ROOT_PATH + 'services/'
global.PATH_CONFIG = APP_ROOT_PATH + 'config.js'
global.PATH_VIEWS = APP_ROOT_PATH + 'views/'
global.PATH_PUBLIC = APP_ROOT_PATH + 'public/'
global.PATH_IO = APP_ROOT_PATH + 'io/'

module.exports = {
    port: process.env.PORT || 3000,
    db:{
        url:'mongodb://common:facilito@ds139761.mlab.com:39761/game-test'
    },
    SECRET_TOKEN: 'supersecretaccestoken'
}
