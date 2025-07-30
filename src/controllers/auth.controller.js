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
