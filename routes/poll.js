const express = require('express')
const app = express()
const { Poll } = require('../models/poll')
const mongoose = require('mongoose')
const { flatten } = require("mongo-dot-notation");
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer');


app.get('/', async (req, res) => {
    try {
        console.log(req.body)

        console.log(req.clientIp)
        return res.status(200).send("ok")
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/', async (req, res) => {
    try {
        console.log(req.clientIp)
        const { live_here, stay_here, serve_here, i_want_to_build } = req.body
        const isAlreadyPolledResult = await Poll.findOne({ ipId: req.clientIp })
        console.log(isAlreadyPolledResult)
        console.log(flatten({ isAlreadyPolledResult, ...req.body }))
        if (isAlreadyPolledResult) {
            const update = await Poll.findOneAndUpdate({ ipId: req.clientIp },
                flatten({ isAlreadyPolledResult, ...req.body }), { new: true })
            return res.status(201).send(update)
        }
        else {
            const newRec = new Poll({ ipId: req.clientIp, ...req.body })
            await newRec.save()
            return res.status(201).send(newRec)
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "something went wrong" })
    }

})


module.exports = app;