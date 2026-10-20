const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
const userService = require('../services/user.service');

exports.getMe = (req, res) => res.json({ success: true, user: req.user });

exports.updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateMe(req.user._id, req.body);
  res.json({ success: true, user });
});

exports.list = asyncHandler(async (req, res) => {
  const result = await userService.list(res.locals.validated.query);
  res.json({ success: true, ...result });
});

exports.getById = asyncHandler(async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.json({ 
    success: true, 
    user 
  });
});

exports.updateRole = asyncHandler(async (req, res) => {
  const user = await userService
  .updateRole(req.params.id, req.body.role, req.user._id);
  res.json({ 
    success: true, 
    user 
  });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const user = await userService
  .updateStatus(req.params.id, req.body.status, req.user._id);
  res.json({ 
    success: true, 
    user 
  });
});