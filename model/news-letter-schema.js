const mongoose = require('mongoose')

const { Schema } = mongoose

const NewsLetterSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please provied email'],
        unique:true
    }
})

module.exports = mongoose.model('NewsLetter', NewsLetterSchema)