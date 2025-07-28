const bcrypt = require('bcryptjs');

exports.hashPassword = async (plain) => bcrypt.hash(plain, 10);
exports.comparePassword = async (plain, hash) => bcrypt.compare(plain, hash);
