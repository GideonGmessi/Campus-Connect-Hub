const AppError = require('../utils/appError.utils');

module.exports = (schema, source = 'body') => (req, res, next) => {
    const {error, value} = schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true
    });

    if(error){
        const details = error.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message, 
        }));

        return next(new AppError('Validation Error', 400, details));
    }
    if (source === 'body'){
        req.body = value;
    }else{
        res.locals.validated = {
            ...res.locals.validated,
            [source]: value
        }
    }
    
    next();
};