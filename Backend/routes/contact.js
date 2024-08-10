const express = require('express')
const router = express.Router()
const Contact = require('../modules/Contact')

router.post('/',async(req,res)=>{
    try {
        user = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            msg: req.body.msg
        })
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})


module.exports = router