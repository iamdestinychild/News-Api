// news-letter.js
// users can subscribe and unsubscribe to news letter

const NewsLetter = require('../model/news-letter-schema')
const { StatusCodes } = require('http-status-codes')
const BadRequest = require('../errors/badrequest')


const subscribe = async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new BadRequest('Please Provide Email')
    }

    const isUniben = email.split('.')[2] === 'uniben'

    if (!isUniben) {
        throw new BadRequest('Sorry Something Went Wrong')
    }

    console.log(isUniben)

    await NewsLetter.create({ email })
    res.status(StatusCodes.OK).json({msg:`user ${email} has been subscribed`})
}

const unsubscribe = (req, res) => {
    res.send('unsubscribe to news letter')
}

module.exports = {
    subscribe,
    unsubscribe
}