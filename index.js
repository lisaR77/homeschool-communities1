require('dotenv').config()
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const forms = require('./routes/forms')
const poll = require('./routes/poll')
var mongoose = require('mongoose')
var cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json())

const requestIp = require('request-ip');
app.use(requestIp.mw())


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected Successfully'))
.catch((err) => console.error('Not Connected', err));


app.use('/api/forms', cors(), forms)
app.use('/api/poll', cors(), poll)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))