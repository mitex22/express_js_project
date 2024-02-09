const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
});

// hash the password before saving it to the database
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.MongooseError('Password and re-password fields do not match!');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;