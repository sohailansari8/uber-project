const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: {
            value: 3,
            message: 'firstname must be at least 3 characters long'
        },
        lastname: {
            type: String,
            minlength: {
                value: 3,
                message: 'lastname must be at least 3 characters long'
            },
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            'Invalid email format'
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: {
            value: 6,
            message: 'password must be at least 6 characters long'
        },
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehical: {
        color: {
            type: string,
            required: true,
            minlength: {
                value: 3,
                message: 'color must be at least 3 characters long'
            },
        },
        plate: {
            type: string,
            required: true,
            minlength: {
                value: 3,
                message: 'plate must be at least 3 characters long'
            },
        },
        capacity: {
            type: number,
            required: true,
            min: {
                value: 1,
                message: 'capacity must be at least 1'
            },
        },
        vehicalType: {
            type: string,
            required: true,
            enum: ['car', 'auto', 'bike'],
        },
    },
    location :{
        lat : {
            type : number,
        },
        lng : {
            type :number, 
        }
    }
}
);

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
    return token;
};

captainSchema.comparePassword = async function (password) {
    const isMatch = await bycrypt.compare(password, this.password);
    return isMatch;
};


captainSchema.hashPassword = async function () {
    this.password = await bycrypt.hash(this.password, 10);
};

const Captain = mongoose.model('Captain', captainSchema);

module.exports = captainmodel;