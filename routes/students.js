// routes/studentRouter.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

//REGISTER STUDENT
router.post('/', studentController.createStudent);

//LOGIN STUDENT
router.get('/login', studentController.loginStudent);

//LOGOUT
router.get('/logout', studentController.logoutStudent)

// Route for getting all students
router.get('/', studentController.getAllStudents);

// Route for getting a specific student by ID
router.get('/:id', studentController.getStudentById);

// Route for updating a specific student by ID
router.put('/:id', studentController.updateStudentById);

// Route for deleting a specific student by ID
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;