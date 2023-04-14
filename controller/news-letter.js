// news-letter.js
// users can subscribe and unsubscribe to news letter

const NewsLetter = require('../model/news-letter-schema')
const { StatusCodes } = require('http-status-codes')
const BadRequest = require('../errors/badrequest')
const mailer = require('../utill/sendmail')

const localUrl = 'http://localhost:4444/api/v1/news-letter'


const subscribe = async (req, res) => {
    const { name, email } = req.body

    if (!name||!email) {
        throw new BadRequest('Please Provide Email')
    }

    const isUniben = email.split('.')[2] === 'uniben'

    if (!isUniben) {
        throw new BadRequest('Sorry Something Went Wrong')
    }

    isUser = await NewsLetter.findOne({ email:email })
        
    if (isUser) {
        throw new BadRequest('Email Already Exist')
    }

    const message = `<!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Uniben lookUp Newsletter</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                color: #333333;
                background-color: #F5F5F5;
                padding: 20px;
                font-size: 14px;
                line-height: 1.5;
                text-align: center;
            }
            h3 {
                font-size: 20px;
                margin-bottom: 12px;
            }
            p {
                font-size: 13px;
                margin-top: 0;
                margin-bottom: 12px;
                color: #333333;
            }
            a {
                text-decoration: none;
                font-weight: bold;
            }
            ul {
                text-align: left;
                margin-left: 20px;
                margin-bottom: 12px;
                color: #333333;
            }
            li {
                margin-bottom: 6px;
            }
            .gold {
                color: #FFD700;
            }
        </style>
    </head>
    <body>
        <h3>Welcome to Uniben lookUp</h3>
        <p style="color: #9C51B6;">Dear ${name},</p>
        <p>Thank you for subscribing to the Uniben lookUp Newsletter! We're excited to keep you up-to-date with the latest news and information from various faculties in the school.</p>
        <p>To confirm your subscription, please click the link below:</p>
        <p><a href="www.unibenlookup.com">Confirm Subscription</a></p>
        <p>Here's a sneak peek of what you can expect from our newsletter:</p>
        <ul>
            <li>Exclusive interviews with prominent professors and academics from various faculties in the school</li>
            <li>Insightful articles and analysis on the latest research and developments in different fields of study</li>
            <li>Important updates on academic events, conferences, and opportunities for students and faculty members</li>
            <li>Tips and advice on how to excel in your studies and research</li>
        </ul>
        <p>If you did not subscribe to this newsletter, please ignore this message or click the link below to unsubscribe:</p>
        <p><a href=${localUrl}>Unsubscribe</a></p>
        <p style="color: #9C51B6;">Thank you for your interest in Uniben lookUp Newsletter! <span class="gold">&#9733;</span></p>
    </body>
    </html>`

    try {

        mailer(email, 'Uniben NewsLetter', message)
        const user = await NewsLetter.create({ name, email })

        res.status(StatusCodes.OK).json({msg:`user ${email} has been subscribed`, unsubscribe:`${localUrl}/?id=${user._id}`})
    }
    catch (err) {
       return err
    }
}

const unsubscribe = async (req, res) => {
    const { id } = req.params
    
    user = await NewsLetter.findOneAndDelete(id)
    
    if (!user) {
        throw new BadRequest('Sorry Something Went Wrong')
    }

    res.status(StatusCodes.OK).json({ msg: `user ${user.email} has been unsubscribed` })

}

module.exports = {
    subscribe,
    unsubscribe
}