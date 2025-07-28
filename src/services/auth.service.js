const { User } = require('../models/user.model');
const {  UserRole } = require('../models/user_roles.model');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

exports.registerUser = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already in use');

  const hashed = await hashPassword(password);
  const user = await User.create({ fullName, email, password: hashed });

  // Initially no role assigned
  return user;
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid email or password');

  const userRole = await UserRole.findOne({
    where: { user_id: user.id, isDeleted: false },
  });

  const token = generateToken({
    email: user.email,
    role: userRole?.role || null,
  });

  return token;
};
