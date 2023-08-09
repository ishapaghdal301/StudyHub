const Course = require("../models/course");
const Lesson = require("../models/lesson");

exports.createLesson = async (req, res) => {
    try {
      const {
        courseId , title , content
      } = req.body;
  
      if (!courseId || !title || !content )
        return res.status(400).json({ msg: "Please fill in all fields." });
  
      const course = await Course.findById(courseId);
      if (!course)
        return res.status(400).json({ msg: "This Course do not exist"});
  
      // const passwordHash = await bcrypt.hash(password, 12);
  
      const newLesson = new Lesson({
        courseId , title , content
      });
  
      const savedLesson = await newLesson.save();
      res.status(201).json(savedLesson);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  exports.getAllLesson = async (req, res) => {
    try {
      const lessons = await Lesson.find();
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching lessons" });
    }
  };

  exports.getLessonByCourseId = async (req, res) => {
    const { id } = req.params;
    try {
      const lessons = await Lesson.find({courseId : id});
      if (!lessons) {
        return res.status(404).json({ msg: "Lesson not found" });
      }
      res.status(200).json(lessons);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

  exports.updateLesson = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLesson = await Lesson.findByIdAndUpdate(id,{title:req.body.title , content : req.body.content}, {
        new: true,
      });
      if (!updatedLesson) {
        return res.status(404).json({ msg: "Lesson not found" });
      }
      res.status(200).json(updatedLesson);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
