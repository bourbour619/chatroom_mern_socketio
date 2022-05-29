const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app)
require('./io')(server)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(require('express-useragent').express())

const db = require('./config/db')

db.authenticate()
    .then(() => {
        console.log('Postgres connected ...')
    })
    .catch(err => console.log('Db error: ' + err))

db.sync({ force: true })
    .then(() => console.log('Postgres db has synced ...'))
    .catch(err => console.log('Sync error: ' + err))

const authRouter = require('./routes/auth')
app.use('/api/v1/auth', authRouter)

const PORT = process.env.port || 5002

server.listen(PORT, console.log(`Server started on port: ${PORT}`))
