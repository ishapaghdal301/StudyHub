// routes/teacherRouter.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const courseController = require('../controllers/courseController');

// Route for creating a new teacher
router.post('/', teacherController.createTeacher);

// Route for getting all teachers
router.get('/', teacherController.getAllTeachers);

//LOGIN TEACHER
router.get('/login', teacherController.loginTeacher);

//LOGOUT
router.get('/logout', teacherController.logoutTeacher)

// Route for getting a specific teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Route for getting a specific teacher by ID
router.get('/allcourses/:id', teacherController.getCoursesByInstructorId );

// Route for updating a specific teacher by ID
router.put('/:id', teacherController.updateTeacherById);

// Route for deleting a specific teacher by ID
router.delete('/:id', teacherController.deleteTeacherById);


module.exports = router;
