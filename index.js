require('dotenv').config()
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const forms = require('./routes/forms')
const poll = require('./routes/poll')
const { TextEncoder, TextDecoder } = require("util");
var mongoose = require('mongoose')
var cors = require('cors');
const app = express()

var corsOptions = {
    origin: ["https://home-communities.netlify.app", "http://localhost:3000", "https://www.homeschoolcommunities.org" ,"http://www.homeschoolcommunities.org" , "http://68.178.207.95" , "https://68.178.207.95", "http://homeschoolcommunities.org", "https://homeschoolcommunities.org",  "*"],
}

app.use(cors(corsOptions));
app.use(express.json())

mongoose.connect("mongodb+srv://codebrainteam:CodebrainTeam*4@cluster0.whnrcze.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Successfully'))
    .catch((err) => console.error('Not Connected', err));

app.get('/test' , (req, res) => {
    res.send("hey bro")
})
app.use('/api/forms' , forms)
app.use('/api/poll', poll)


const port = 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))