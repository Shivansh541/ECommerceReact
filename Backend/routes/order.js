const express = require('express')
const router = express.Router()
const Order = require('../modules/Order')


router.post('/placeOrder',
    async (req, res) => {
        const { product, user, address } = req.body
        try {
            const order = new Order({
                product, user, address,
            })
            const savedOrder = await order.save()

            res.json(savedOrder)

        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Internal Server Error")
        }

    })
    
module.exports = router