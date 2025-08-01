const db = require('../config/sequelize');
const User = db.User;
const UserRole = db.UserRole;
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

exports.assignUserRole = async (userId, role) => {
  const validRoles = ["Admin", "Manager", "Employee", "Finance"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // If already has role, update it
  const existing = await UserRole.findOne({
    where: { user_id: userId, isDeleted: false },
  });

  if (existing) {
    existing.role = role;
    await existing.save();
  } else {
    await UserRole.create({ user_id: userId, role });
  }
};

exports.revokeUserRole = async (userId) => {
  const userRole = await UserRole.findOne({
    where: { user_id: userId, isDeleted: false },
  });

  if (!userRole) return null;

  userRole.isDeleted = true;
  await userRole.save();
  return true;
};

exports.fetchAllUsers = async () => {
  return await User.findAll({
    where: { isDeleted: false },
    attributes: { exclude: ["password"] },
    order: [["createdAt", "DESC"]],
  });
};

exports.updateUser = async (userId, updates) => {
  const user = await User.findOne({ where: { id: userId, isDeleted: false } });
  if (!user) throw new Error("User not found");

  const fieldsToUpdate = {};
  if (updates.fullName) fieldsToUpdate.fullName = updates.fullName;
  if (updates.email) fieldsToUpdate.email = updates.email;

  await user.update(fieldsToUpdate);
  return user;
};

exports.softDeleteUser = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  await user.update({ isDeleted: true });
};