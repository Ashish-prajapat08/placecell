const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collegeId: {
    type: String,
    unique: true,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10,
  },
  backlogs: {
    type: Number,
    default: 0,
  },
  tenthPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  twelfthPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  tenthBoard: {
    type: String,
    required: true,
  },
  twelfthBoard: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  linkedinProfile: {
    type: String,
  },
  resume: {
    type: String, // URL to resume file or path
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
