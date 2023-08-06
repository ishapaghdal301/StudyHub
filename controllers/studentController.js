// controllers/studentController.js
const Student = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    const { fname, lname, emailId, mobileNo, username, password, profilePicture } = req.body;
    const newStudent = new Student({ fname, lname, emailId, mobileNo, username, password, profilePicture });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating student' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
};

// Update a student by ID
exports.updateStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating student' });
  }
};

// Delete a student by ID
exports.deleteStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await Student.findByIdAndRemove(id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
};
