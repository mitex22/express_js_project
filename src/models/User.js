const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/@\w+\.\w+$/, 'Invalid email address! ...FROM User model'],
        minLength: [10, 'Email should be atleast 10 chars long! ...FROM User model']
    },
    password: {
        type: String,
        required: true,
        match: [/^\w+$/, 'Password should contain english letters and digits only! ...FROM User model'],
        minLength: [6, 'Password should be atleast 6 chars long! ...FROM User model']
    },
});

// hash the password before saving it to the database
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;