const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/', lessonController.createLesson);
router.get('/', lessonController.getAllLesson);
router.put('/:id', lessonController.updateLesson);

