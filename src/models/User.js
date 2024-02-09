const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
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

// AI GENERATED
// userSchema.methods.checkPassword = async function(password){
//     return await bcrypt.compare(password, this.password);
// };

// hash the password before saving it to the database
// userSchema.pre('save', async function () {
//     if (!this.isModified('password')) return next();
//     try{
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }catch(err){
//         console.log(err);
//     }
// });

const User = mongoose.model('User', userSchema);

module.exports = User;