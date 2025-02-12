const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    category:{
        type:String,
        required: true
    },
    price:{
        type: String,
        requied:true
    },
    Date:{
        type: Date,
        default: Date.now
    }
})
const Product = mongoose.model('Product',ProductSchema)
module.exports = Product