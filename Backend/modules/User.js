const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    city:{
        type: String,
        requied:true
    },
    state:{
        type: String,
        required:true
    },
    zipcode:{
        type: String,
        required:true
    },
    Orders:{
        type: Array,
    },
    Date:{
        type:Date,
        default: Date.now
    }
})
const User = mongoose.model('User',UserSchema)
module.exports = User