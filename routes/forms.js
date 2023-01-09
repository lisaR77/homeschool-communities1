const express = require('express')
const app = express()
const { formOne, formTwo, formThree, validate, validateboth, validateSecond, validateThird  } = require('../models/form')
const { form1, form2, form3 , sendFormToGmail} = require('../utils/send_email')
const mongoose = require('mongoose')

app.post('/one', async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateboth(req.body)
        if (error) return res.status(400).send({error_msg: error.message})
        const isExists = await formOne.findOne({email: req.body.email})
        if (isExists) return res.status(400).send({error_msg: "email already exists"})
        const form = new formOne({ ...req.body })
        await form.save()
        sendFormToGmail(form3)

        return res.status(201).send(form)
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/two', async (req, res) => {
    try {
        validateSecond
        const { error } = validateSecond(req.body)
        if (error) return res.status(400).send({errorMsg: error.message})
        const form = new formTwo({ ...req.body })
        await form.save()
        return res.status(201).send(form)
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/three', async (req, res) => {
    try {
        const { error } = validateThird(req.body)
        if (error) return res.status(400).send({errorMsg: error.message})
        const form = new formThree({ ...req.body })
        await form.save()
        return res.status(201).send(form)
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ message: "something went wrong" })
    }
})

// app.put('/:id', async(req, res) => {
//     // const {error} = validate(req.body)
//     // if (error) return res.status(400).send(error.message)
//     // const update = {}
//     const id  = req.params.id
//     const genre = await Genre.findById({_id: mongoose.Types.ObjectId(id)})
//     if(!genre) return res.status(404).send("Not found")
//     let newgenre = await Genre.findByIdAndUpdate({_id: mongoose.Types.ObjectId(id)}, {...req.body}, {new:true})
//     return res.send(newgenre)
// })

// app.delete('/:id', auth, adminAuth, async(req, res) => {
//     const id  = req.params.id
//     try{
//         const genre = await Genre.findById({_id: ObjectId(id)})
//         if(!genre) return res.status(404).send("Not found")
//         await Genre.findByIdAndDelete({_id: mongoose.Types.ObjectId(id)})
//         return res.send("deleted")
//     }
//     catch(err){
//         console.log(err)
//         return res.status(500).send(err)
//     }
// })

// app.get('/error', (req, res) => {
//     throw new Error("this is a custom error")
// })

// app.get('/error2', (req, res) => {
//     throw new Error("this is a custom error2")
// })


// console.log(app.get('env'))

module.exports = app;