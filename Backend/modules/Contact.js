const mongoose = require('mongoose')
const {Schema} =mongoose

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    msg:{
        type:String
    },
    Date: {
        type: Date,
        default: Date.now,
    },
})
const Contact=mongoose.model('contact', ContactSchema)
module.exports = Contact