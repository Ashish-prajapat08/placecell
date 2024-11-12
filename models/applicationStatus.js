const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const applicationDetails = new Schema({
    studentEmail:{
        type: String,
        required: true
    },

    companyEmail:{
        type: String,
        required: true
    },

    applicationStatus:{
        type: String,
        required: false,
        default: 'Not Applied'

    }

}) 

const applicationDetailsModel = mongoose.model('applicationDetails',applicationDetails);
module.exports = applicationDetailsModel;

