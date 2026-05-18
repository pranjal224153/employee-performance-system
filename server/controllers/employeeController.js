const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
       return res.status(400).json({ message: 'Department query parameter is required' });
    }
    const employees = await Employee.find({ department: { $regex: new RegExp(department, 'i') } });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, email, role, department, skills, performanceScore, completedProjects, feedback } = req.body;
    
    if (!name || !email || !role || !department || !skills || performanceScore === undefined || completedProjects === undefined || !feedback) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const employee = await Employee.create({
      name,
      email,
      role,
      department,
      skills,
      performanceScore,
      completedProjects,
      feedback
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  searchEmployees,
  addEmployee
};
