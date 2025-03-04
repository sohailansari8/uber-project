const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId : {
        type: String,
        required: false,
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

userSchema.statics.hashPassword = async function(password) {
   return await bcrypt.hash(password, 10);
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;