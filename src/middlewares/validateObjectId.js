const appError = require('../utils/appError.utils');

module.exports = (param = 'id') => (req, res, next) => {
    if(!/^[0-9a-fA-F]{24}$/.test(req.params[param])) {
        return next(new appError(`Invalid ${param}`, 400));
    }
    next();
};