const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preDetailsSchema = new Schema({
    computerCode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    }
});

const preDetailsModel = mongoose.model('preDetails', preDetailsSchema);
module.exports = preDetailsModel;
