
const authService = require('../services/auth.service');
const asyncHandler = (fn) => (req, res, next) => {
     return Promise.resolve(fn(req, res, next)).catch(next);
};
  
//REGISTER USER
  exports.register = asyncHandler (async (req, res) => {
  
    const { user, token } = await authService.register(req.body);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user, token }
      });
    })

    //LOGIN USER
    exports.login = asyncHandler(async (req, res) => {
        const { user, token } = await authService.login(req.body);
       res.json({
            success: true,
            message: 'User logged in successfully',
            data: { user, token }
        });
    });

    exports.me = asyncHandler(async (req, res) => {
        res.json({
            success: true,
            user: req.user
        });
    });

    exports.changePassword = asyncHandler(async (req, res) => {
        const token = await authService.changePassword(req.user._id, req.body);
        await authService.changePassword(req.user, oldPassword, newPassword);
        res.json({
            success: true,
            message: 'Password changed successfully',
            token
        });
    });

    exports.logout = asyncHandler(async (req, res) => {
        await authService.logout(req.user._id);
        res.json({
            success: true,
            message: 'User logged out successfully'
        });
    });