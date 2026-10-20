const connectDB = require('../config/db');
const User = require('../models/User');
const mongoose = require('mongoose');

(async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    process.exit(1);
  }
  await connectDB();
  const exists = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (exists) {
    console.log('Admin already exists');
  } else {
    await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' });
    console.log('Admin created');
  }
  await mongoose.disconnect();
})();