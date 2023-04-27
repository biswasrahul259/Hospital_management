const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    topic:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})

const contactUs = new mongoose.model("contact",ContactSchema)
module.exports = contactUs ;