const authRoute = require('./auth')
const userRoute=require('./user')
function route(app) {
    app.use('/api', authRoute)
    app.use('/api', userRoute)

}

module.exports = route