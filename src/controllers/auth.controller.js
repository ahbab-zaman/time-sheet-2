const AuthService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const user = await AuthService.registerUser(req.body);

    // Remove password from response
    const { password, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await AuthService.loginUser(req.body);
    res.status(200).json({ 
      message: "Login successful",
      token 
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.assignRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    await AuthService.assignUserRole(userId, role);
    res.status(200).json({ message: "Role assigned successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.revokeRole = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const result = await AuthService.revokeUserRole(userId);

    if (!result) {
      return res.status(404).json({ error: "No active role found for this user" });
    }

    res.status(200).json({ message: "User role revoked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await AuthService.fetchAllUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await AuthService.updateUser(id, updates);
    
    if (user && user.dataValues) {
      delete user.dataValues.password;
    }

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await AuthService.softDeleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};