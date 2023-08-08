
// routes/courseRouter.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { route } = require('./teacherRouter');

// Route for creating a new course
router.post('/', courseController.createCourse);

// GET all courses
router.get('/', courseController.getAllCourses);

// GET a specific course
router.get('/:id', courseController.getCourseById);

//GET COURSES
router.get('/allcourses' , courseController.getCoursesByInstructorUsername);

// POST create a new course
router.post('/', courseController.createCourse);

// PUT update a course
router.put('/:id', courseController.updateCourse);

// DELETE a course
router.delete('/:id', courseController.deleteCourse);


// Other course routes can be added here
// Example: Get a specific course, update course info, etc.

module.exports = router;
