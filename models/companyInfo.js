const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  orgType: {
    type: String,
    enum: ['Private sector', 'Start-up', 'Govt. owned', 'Public sector', 'MNC (Indian or Foreign)'],
    required: true,
  },
  industrySector: {
    type: String,
    enum: [
      'Analytics',
      'Consulting',
      'Core (Technical)',
      'Finance',
      'IT',
      'Business Development',
      'Sales & Marketing',
      'Management',
    ],
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  jobProfile: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    enum: ['2024', '2025'],
    required: true,
  },
  recruitment: {
    type: String,
    enum: ['Internship', 'Placement'],
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  postingLocation: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  minCGPA: {
    type: Number,
    required: true,
  },
  minMarks10th: {
    type: Number,
    required: true,
  },
  minMarks12th: {
    type: Number,
    required: true,
  },
  medicalRequirement: {
    type: String,
    required: true,
  },
  training: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
