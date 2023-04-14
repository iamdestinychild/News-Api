const express = require('express')
const {StatusCodes} = require('http-status-codes')

require('dotenv').config()
require('express-async-errors')

const errorHandler = require('./middleware/error-handler')

const app = express()

app.use(express.json())

const newsLetter = require('./routes/news-letter-route')

//  db connect
const connectDb = require('./db/connect')

// routes

app.use('/api/v1/news-letter', newsLetter)


// middleware
app.use(errorHandler)

const port = process.env.PORT || 4444

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()