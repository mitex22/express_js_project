const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    // Check if user exists in DB
    const user = await User.findOne({email: userData.email});

    if (user) {
        throw new Error('Email already exists! ...FROM authService');
    }

    return User.create(userData);
};

exports.login = async (email, password) => {
    // Get user from DB
    const user = await User.findOne({ email });

    // Check if user exists in DB
    if (!user) {
        throw new Error('User does not exit!');
    }

    // Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Password does not match!');
    }

    // Generate JWT
    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' })

    return token;
};