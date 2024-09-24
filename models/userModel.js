const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1/E-commerce");

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    currLevel:{
        type: Number,
        default: 1
    }
    
})

module.exports = mongoose.model("user",userSchema);