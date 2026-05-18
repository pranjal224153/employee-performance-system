const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  department: {
    type: String,
    required: [true, 'Please add a department']
  },
  skills: {
    type: [String],
    required: [true, 'Please add at least one skill']
  },
  performanceScore: {
    type: Number,
    required: [true, 'Please add a performance score']
  },
  role: {
    type: String,
    required: [true, 'Please add a role']
  },
  completedProjects: {
    type: Number,
    required: [true, 'Please add completed projects']
  },
  feedback: {
    type: String,
    required: [true, 'Please add manager feedback']
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
