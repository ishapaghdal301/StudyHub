
const Teacher = require('../models/teacher');

exports.createTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher( req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Error creating teacher' });
  }
};


// Get all Teachers
exports.getAllTeachers = async (req, res) => {
    try {
      const Teachers = await Teacher.find();
      res.status(200).json(Teachers);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching students' });
    }
  };
  
  // Get a specific teacher by ID
  exports.getTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
      const teacher = await Teacher.findById(id);
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching teacher' });
    }
  };
  
  // Update a teacher by ID
  exports.updateTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTeacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      res.status(200).json(updatedTeacher);
    } catch (error) {
      res.status(500).json({ error: 'Error updating teacher' });
    }
  };
  
  // Delete a teacher by ID
  exports.deleteTeacherById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTeacher = await Teacher.findByIdAndRemove(id);
      if (!deletedTeacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      res.status(200).json(deletedTeacher);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting teacher' });
    }
  };
  
