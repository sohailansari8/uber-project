const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
