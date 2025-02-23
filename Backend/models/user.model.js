const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        type : String,
        required: true,
        minlength :[3 , ' first name must be alteast 3 characters long'],
        lastname: {
            type: String,
            required: true,
            minlength :[3 , ' last name must be alteast 3 characters long'],   
        }
    },
    email:{
        type :String,
        required: true,
        unique : true,
        minlength:[5 , 'email must be 5 chracter long']
    },
    password:{
        type : String,
        required: true,
        select : false,
    },
    socketId :{
        type : String,
    },

})


userSchema.method.generateAuthToken = function(){
    const token = jwt.sign({ _id : this._id }, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password);
}

userSchema.static.hashPassword = async function (password){
    return await bcrypt.hash(password , 10);
}

const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;