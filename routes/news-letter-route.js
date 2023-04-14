const express = require('express')

const router = express.Router()

const {subscribe,unsubscribe} = require('../controller/news-letter')

router.route('/').post(subscribe).delete(unsubscribe)

module.exports = router