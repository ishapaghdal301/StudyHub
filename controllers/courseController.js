// controllers/courseController.js
const Teacher = require("../models/teacher");
const Course = require("../models/course");

// Controller for course related operations
// Example: Create a new course

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      instructor,
      students,
      description,
      category,
      price,
      duration,
      image,
      videoURL,
    } = req.body;
    if (
      !title ||
      !instructor ||
      !description ||
      !category ||
      !price ||
      !duration ||
      !videoURL
    )
      return res.status(400).json({ msg: "Please fill in all fields." });

    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    // console.log('Error creating course:', err);
    res.status(400).json({ msg: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

exports.getCoursesByInstructorUsername = async (req, res) => {
  try {
    const username = req.body.username;

    // Find the instructor by username
    const instructor = await Teacher.findOne({ username: username });
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    const instructorId = instructor._id;

    // Find courses associated with the instructor
    const courses = await Course.find({ instructor: instructorId });
    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ error: "No courses found for this instructor" });
    }

    res.json(courses);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: "Failed to update course" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(deletedCourse);
  } catch (err) {
    res.status(400).json({ error: "Failed to delete course" });
  }
};
