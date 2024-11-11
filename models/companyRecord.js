const mongoose = require('mongoose');

// Using this to keep a record for the student registere for a particular company 
const companySchema = new mongoose.Schema({
  companyEmail: {
    type: String,
    required: true,
  },
  registeredStudents: [
    {
      type : String,
      // I will enter in the email id for the identificatiion purpose 
      // who have registered 
      required: false,
    }
  ]
});

// Export the model
module.exports = mongoose.model('CompanyRecord', companySchema);