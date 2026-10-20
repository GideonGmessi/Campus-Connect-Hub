
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const appError = require('../utils/appError.utils');
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

const jwtSecret = process.env.JWT_SECRET;

exports.authenticate = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        throw new appError('Authorization header required', 401);
    }

    const token = header.split(' ')[1];
    let payload;
    try {
       payload = jwt.verify(token, jwtSecret);
    } catch (err) {
        throw new appError(err.name === 'TokenExpiredError' ? 'Expired token' : 'Invalid Token', 401);
    }

    const user = await User.findById(payload.id).select('+tokenVersion');
    if(!user) throw new appError('User no longer exists', 404);

    //Check if the token version in the payload matches the user's current token version
    if(payload.tokenVersion !== user.tokenVersion){
        throw new appError('Token is no longer valid!', 401);
    }
    req.user = user;
    next();
});

//Block suspended users from accessing protected routes
exports.checkSuspended = asyncHandler(async (req, res, next) => {
    if(req.user.status === 'suspended'){
        return next(new appError('User account is suspended', 403));
    }
    next();
});

exports.protect = [exports.authenticate, exports.checkSuspended];