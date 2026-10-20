const appErrors = require('../utils/appError.utils');

module.exports = (...roles) => (req, res, next) => {
    if(!req.user){
        return next(new appErrors('Authentication Required', 401));
    }

    if(!roles.includes(req.user.role)){
        return next(new appErrors('You do not have the Permission to perform this Action', 403));
    }
    next();
};