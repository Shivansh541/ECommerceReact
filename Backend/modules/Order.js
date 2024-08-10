const mongoose = require('mongoose')
const {Schema} = mongoose

const OrderSchema = new Schema({
    product:{
        type: Object,
        required: true
    },
    user:{
        type:Object,
        required:true
    },
    address:{
        type: Object,
        required:true
    },
    Date:{
        type:Date,
        default: Date.now
    }
})
const Order = mongoose.model('Order',OrderSchema)
module.exports = Order