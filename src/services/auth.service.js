const User = require('../models/user.model');
const appError = require('../utils/appError.utils');
const { signToken } = require('../utils/token.utils');

exports.register = async ({ name, password, email }) => {
    if (await User.findOne({ email })) {
        throw new appError('Email already exists', 409);
    }

    const user = await User.create({ name, password, email, role: 'user' });
    
    const token = signToken(user);
    
    const safeUser = user.toObject();
    delete safeUser.password;
    return { User: safeUser, token };
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password +tokenVersion');

    if(!user || !(await user.comparePassword(password))){
        throw new appError('Invalid email or password', 401);
    }

    if(user.status !== 'active'){
        throw new appError('User account is inactive', 403);
    }

    const token = signToken(user);
    
    const safeUser = user.toObject();
    delete safeUser.password;
    return {user: signToken, token};
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select('+password +tokenVersion');
    if(!(await user.comparePassword(currentPassword))){
        throw new appError('Current password is incorrect', 401);
    }
    user.password = newPassword;
    user.tokenVersion += 1; // Increment token version to invalidate old tokens
    await user.save();
    return signToken(user);
};

exports.logout = async (userId) => {
    await User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });
};
