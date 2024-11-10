const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const companyDetails = new Schema({
    adminUsername:{
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

const companyDetailsModel = mongoose.model('companyDetailsModel',companyDetails);
module.exports = companyDetailsModel;