const userModel = require('../models/user.model');


module.exports.createUser = async({
    firstname , lastname , email , password
}) => {
    if(!firstname || !lastname || !email || !password){
        throw new Error('Please fill all fields');
    }
    const user = userModel.create({
       firstname : {
        firstname,
        lastname
       },
       email,
       password
    })
    return user;
}