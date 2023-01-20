require('dotenv').config()
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const forms = require('./routes/forms')
const poll = require('./routes/poll')
var mongoose = require('mongoose')
var cors = require('cors');
const app = express()

var corsOptions = {
    origin: ["https://home-communities.netlify.app", "http://localhost:3000", "https://b96d-103-193-18-5.ngrok.io" , "*"],
}

app.use(cors(corsOptions));
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Successfully'))
    .catch((err) => console.error('Not Connected', err));

app.get('/test' , (req, res) => {
    res.send("hey bro")
})
app.use('/api/forms' , forms)
app.use('/api/poll', poll)


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))