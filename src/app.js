const express = require("express");
const { authPage } = require("../src/middleware/auth")
const app = express()
require("../src/db/connection");
const regdata = require("../src/models/regdata")
const port = process.env.PORT || 8000
app.use(express.json())
var cors = require('cors');
app.use(cors())

app.post("/registrationUserData", async (req, res) => {
    try {
        const user = new regdata(req.body)
        const createRegistration = await user.save()
        res.status(201).send(createRegistration);
    } catch (error) {
        res.status(400).send(error)
    }
})

// app.get("/registrationData/:id", async (req, res) => {
//     try {
//         const _id = req.params.id
//         const updatedRegistrationData = await regdata.findByIdAndUpdate({ _id: _id })
//         res.status(201).send(updatedRegistrationData)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

app.patch("/registrationUserData/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const updatedRegistrationData = await regdata.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(updatedRegistrationData)
    } catch (error) {
        res.status(400).send(error)
    }
})


app.get("/registrationUserData", async (req, res) => {
    const registration = await regdata.find()
    res.send(registration)
})

app.post("/registrationUserData/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await regdata.findOne({ email, password })
        if (!user) {
            res.status(401).json({
                message: false,
                error: "User not found",
            })
        } else {
            res.status(200).json({
                message: true,
                user,
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
})

app.listen(port)