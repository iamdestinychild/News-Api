const mongoose = require('mongoose')

const { Schema } = mongoose

const NewsLetterSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provied email']
    }
})

module.exports = mongoose.model('NewsLetter', NewsLetterSchema)