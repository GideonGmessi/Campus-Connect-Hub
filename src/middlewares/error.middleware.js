const appError = require('../utils/appError.utils');

exports.notFound = (req, res, next) => 
    next(new appError(`Route not found ${req.method} ${req.originalUrl}`, 404));

    exports.errorHandler = (err, req, res, next) => {
        console.log('API Error:', err);
        
        let statusCode = err.statusCode || 500;
        let message = err.message || 'Internal Server Error';
        let details = err.details;

        if (err.code === 11000){
            statusCode = 409;
            message = `${Object.keys(err.keyValue || {})[0] || 'value'} already exists`;
        }else if(err.name === 'CastError'){
            statusCode = 400;
            message = `Invalid ${err.path}`;
        }else if(err.name === 'ValidationError'){
            statusCode = 400;
            details = Object.values(err.errors).map((error) => ({
                field: error.path,
                message: error.message
            }));
        }else if (err.type === 'entity.parse.failed'){
            statusCode = 400;
            message = 'Malformed JSON body';
        }


        if(statusCode === 500){
            message = 'Internal Server Error';
        }

        const body = {
            success: false,
            message,
        }

        if(details){
            body.details = details;
        }
       
        res.status(statusCode).json(
            body
        );
};