const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userDetails = new Schema({
    computerCode:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    }

}) 

const userDetailsModel = mongoose.model('UserDetailsModel',userDetails);
module.exports = userDetailsModel;