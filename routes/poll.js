const express = require('express')
const app = express()
const { Poll } = require('../models/poll')
const mongoose = require('mongoose')
const { flatten } = require("mongo-dot-notation");
var ObjectId = require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer');


app.post('/', async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.clientIp)
        console.log(req.body)
        const { build_this } = req.body
        const isAlreadyPolledResult = await Poll.findOne({ ipId: req.body.ipId })
        console.log(isAlreadyPolledResult)
        console.log(flatten({ isAlreadyPolledResult, ...req.body }))
        if (isAlreadyPolledResult) {
            const updatedRes = await Poll.findOneAndUpdate({ ipId: req.body.ipId },
                flatten({ isAlreadyPolledResult, ...req.body }), { new: true })
            let Response = [
                {id: 1, check: 'I advocate for homeschool communities', status: updatedRes.homeschool_communities, keyName:'homeschool_communities'},
                {id: 2, check: 'I want this in my existing community', status: updatedRes.existing_community, keyName:'existing_community'},
                {id: 3, check: 'I want to build this', status: updatedRes.build_this, keyName:'build_this'},
                {id: 4, check: 'I want to live here', status: updatedRes.live_here, keyName:'live_here'},
                {id: 5, check: 'I want to serve here', status: updatedRes.serve_here,keyName:'serve_here'},
                {id: 6, check: 'I will tell my clients about it', status: updatedRes.my_clients, keyName:'my_clients'},
                {ipAdd: updatedRes.ipId}
            ]
            return res.status(201).send(Response)
        }
        else {
            const newRec = new Poll({ ipId: req.body.ipId, ...req.body })
            await newRec.save()
            let Response = [
                {id: 1, check: 'I advocate for homeschool communities', status: newRec.homeschool_communities, keyName:'homeschool_communities'},
                {id: 2, check: 'I want this in my existing community', status: newRec.existing_community, keyName:'existing_community'},
                {id: 3, check: 'I want to build this', status: newRec.build_this, keyName:'build_this'},
                {id: 4, check: 'I want to live here', status: newRec.live_here, keyName:'live_here'},
                {id: 5, check: 'I want to serve here', status: newRec.serve_here,keyName:'serve_here'},
                {id: 6, check: 'I will tell my clients about it', status: newRec.my_clients, keyName:'my_clients'},
                {ipAdd: newRec.ipId}
            ]
            return res.status(201).send(Response)
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "something went wrong" })
    }

})


module.exports = app;