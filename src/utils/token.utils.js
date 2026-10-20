const jwt = require('jsonwebtoken');
//const {jwtSecret, jwtExpiresIn} = process.env;

exports.signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
            tokenVersion: user.tokenVersion
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};