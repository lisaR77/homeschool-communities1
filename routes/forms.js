const express = require('express')
const app = express()
const { formOne, formTwo, formThree, validate, validateboth, validateSecond, validateThird } = require('../models/form')
const { form1, form2, form3, sendFormToGmail } = require('../utils/send_email')
const mongoose = require('mongoose')

app.post('/one', async (req, res) => {
    try {
        console.log(req.body)
        const { error } = validateboth(req.body)
        if (error) return res.status(400).send({ error_msg: error.message })
        // const isExists = await formOne.findOne({email: req.body.email})
        // if (isExists) return res.status(400).send({error_msg: "email already exists"})
        const form = new formOne({ ...req.body })
        await form.save()
        var htmlData = `<h3>check all that apply Name</h3><br/> 
                        <h5>${form.home_builder} I am a homebuilder.</h5><br/>
                        <h5>${form.commercial_builder} I am a commercial builder.</h5><br/>
                        <h3>Company Name</h3><br/> 
                        <h5>${form.company_name}</h5><br/>
                        <h3>Contact Name</h3><br/> 
                        <h5>${form.contact_name}</h5><br/>
                        <h3>Company Name</h3><br/> 
                        <h5>${form.email}</h5><br/>
                        <h3>Company Name</h3><br/> 
                        <h5>${form.phone}</h5><br/>`
        let mail = {
            from: 'zain.techling@gmail.com', // sender address
            to: 'zaynsheikhofficial@gmail.com',// list of receivers
            subject: 'gasvasj 1st✔', // Subject line
            text: `Hasbcahv awjhbvabdv ${form.email}?`, // plain text body
            // template: 'form', 

            html: htmlData
        };
        
        sendFormToGmail(mail)

        return res.status(201).send(form)
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/two', async (req, res) => {
    try {
        const { error } = validateSecond(req.body)
        if (error) return res.status(400).send({ errorMsg: error.message })
        const form = new formTwo({ ...req.body })
        await form.save()
        var htmlData = `<h3>check all that apply Name</h3><br/> 
                        <h5>${form.realtor} I am a realtor and plan to tell my clients about homeschool communities.</h5><br/>
                        <h3>Company Name</h3><br/> 
                        <h5>${form.company_name}</h5><br/>
                        <h3>Contact Name</h3><br/> 
                        <h5>${form.contact_name}</h5><br/>
                        <h3>Company Name</h3><br/> 
                        <h5>${form.email}</h5><br/>
                        <h3>Company Name</h3><br/> 
                        <h5>${form.phone}</h5><br/>`
        let mail = {
            from: 'zain.techling@gmail.com', // sender address
            to: 'zaynsheikhofficial@gmail.com',// list of receivers
            subject: 'gasvasj 1st✔', // Subject line
            text: `Hasbcahv awjhbvabdv ${form.email}?`, // plain text body
            // template: 'form', 

            html: htmlData
        };
        
        sendFormToGmail(mail)
        return res.status(201).send(form)
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/three', async (req, res) => {
    try {
        const { error } = validateThird(req.body)
        if (error) return res.status(400).send({ errorMsg: error.message })
        const form = new formThree({ ...req.body })
        await form.save()
        var htmlData = `<h3>check all that apply Name</h3><br/> 
                        <h5>${form.homeschool} I would like to live in a homeschool community.</h5><br/>
                        <h5>${form.teacher_or_skilled} I am a teacher or skilled parent and am interested in serving a homeschool community.</h5><br/>
                        <h5>${form.wish_we_had} I wish we had something like this in our existing community.</h5><br/>
                        <h5>${form.advocate_for} I advocate for homeschool communities.</h5><br/>
                        <h3>First Name : </h3>
                        <span>${form.first_name}</span><br/>
                        <h3>Last Name : </h3>
                        <span>${form.last_name}</span><br/>
                        <h3>Company Name : </h3>
                        <span>${form.email}</span><br/>`
        let mail = {
            from: 'zain.techling@gmail.com', // sender address
            to: 'zaynsheikhofficial@gmail.com',// list of receivers
            subject: 'gasvasj 1st✔', // Subject line
            text: `Hasbcahv awjhbvabdv ${form.email}?`, // plain text body
            // template: 'form', 

            html: htmlData
        };
        
        sendFormToGmail(mail)
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