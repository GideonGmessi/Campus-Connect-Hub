const User = require('../models/user.model');
const AppError = require('../utils/appError.utils');

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.updateMe = async (userId, { name }) => {
  // Whitelist: only name is ever written, whatever else the client sent
  return User.findByIdAndUpdate(userId, { name }, { new: true, runValidators: true });
};

exports.list = async ({ page, limit, search, role }) => {
  const filter = {};
  if (search) {
    const rx = new RegExp(escapeRegex(search), 'i'); // escaped: no regex injection
    filter.$or = [{ name: rx }, { email: rx }];
  }
  if (role) filter.role = role;

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    User.countDocuments(filter),
  ]);
  return { users, total, page, pages: Math.ceil(total / limit) };
};

exports.getById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found', 404);
  return user;
};

exports.updateRole = async (id, role, actorId) => {
  if (id === actorId.toString()) {
    throw new AppError('You cannot change your own role', 400);
  }
  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
  if (!user) throw new AppError('User not found', 404);
  return user;
};

exports.updateStatus = async (id, status, actorId) => {
  if (id === actorId.toString()) {
    throw new AppError('You cannot change your own status', 400);
  }
  const user = await User.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  if (!user) throw new AppError('User not found', 404);
  return user;
};