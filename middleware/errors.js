const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (error, req, res, next) => {
    let err = { ...error };

    err.message = error.message;

    // Mongoose Bad ObjectId
    if (error.name === 'CastError') {
        const message = `Resource not found with id of ${error.value}`;
        err = new ErrorResponse(message, 404);
    }

    // Mongo Duplicate Key
    if(error.code === 11000) {
        const message = `Duplicate field value entered with field/ ${Object.keys(error.keyPattern)}: '${Object.values(error.keyValue)}'`;
        err = new ErrorResponse(message, 400);
    }

    // Mongoose Validation Error
    if(error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(value => value.message);
        console.log(message);
        err = new ErrorResponse(message, 400);
    }

    res.status( err.statusCode || 500).json({
        success: false,
        data: [],
        errors: err.message || "Server Error"
    })
}

module.exports = errorHandler;