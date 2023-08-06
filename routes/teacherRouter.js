// routes/teacherRouter.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Route for creating a new teacher
router.post('/', teacherController.createTeacher);

// Route for getting all teachers
router.get('/', teacherController.getAllTeachers);

// Route for getting a specific teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Route for updating a specific teacher by ID
router.put('/:id', teacherController.updateTeacherById);

// Route for deleting a specific teacher by ID
router.delete('/:id', teacherController.deleteTeacherById);


module.exports = router;
