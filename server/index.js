const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const people = require('./routes/api/people')
app.use('/api/people', people)

const login = require('./routes/api/login')
app.use('/api/login', login)

const port = 5001

app.listen(port, () => console.log(`Server listening on port ${port}`))
