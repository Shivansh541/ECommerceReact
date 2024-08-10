const express = require('express')
const router = express.Router()
const Product = require('../modules/Product')


router.get('/fetchallproducts', async (req, res) => {
    try {
        const products= await Product.find()
        res.send(products)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router
router.post('/addproduct',
    async (req, res) => {
        const { name, description, image, category, price } = req.body
        try {
            const product = new Product({
                name, description,image, category, price
            })
            const savedProduct = await product.save()

            res.json(savedProduct)

        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Internal Server Error")
        }

    })
    
module.exports = router