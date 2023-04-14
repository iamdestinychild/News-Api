const { StatusCodes } = require('http-status-codes')


const errorHandler = (erro, req, res, next) => {
    const customError = {
        msg: erro.message || 'Ooops Server Error',
        statusCode: erro.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    res.status(customError.statusCode).json({msg:customError.msg})
    
}

module.exports = errorHandler