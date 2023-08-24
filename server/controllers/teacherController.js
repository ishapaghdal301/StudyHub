const Teacher = require("../models/teacher");
const Course = require("../models/course");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//REGISTER TEACHER
exports.createTeacher = async (req, res) => {
  try {
    const {
      fname,
      lname,
      emailId,
      mobileNo,
      username,
      password,
      experience,
      profilePicture,
    } = req.body;
    if (
      !fname ||
      !lname ||
      !emailId ||
      !mobileNo ||
      !username ||
      !password ||
      !experience
    )
      return res.status(400).json({ msg: "Please fill in all fields." });

    if (!validateEmail(emailId))
      return res.status(400).json({ msg: "Invalid email" });

    const teacher = await Teacher.findOne({ username });

    if (teacher)
      return res.status(400).json({ msg: "This username already exists." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });

    // const passwordHash = await bcrypt.hash(password, 12);

    const newTeacher = new Teacher({ fname, lname, emailId, mobileNo, username, password,experience, profilePicture });

    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(500).json({ msg : err.msg });
  }
};

//LOGIN TEACHER
exports.loginTeacher = async (req, res) => {
  try {
    const {username, email, password } = req.body;
    const teacher = await Teacher.findOne({
      username: username,
    });
    if (!teacher)
      return res.status(400).json({ msg: "That username doesn't exist." });
    const isPasswordCorrect = (teacher.password == password);
    // await bcrypt.compare(
    //   password,
    //   student.password
    // );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials" });

      const refresh_token = createRefreshToken({ id: teacher._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 7 days
      });

    //login sucsess
    res.status(200).json({ teacher });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

exports.logoutTeacher = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

// Get all Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const Teachers = await Teacher.find();
    res.status(200).json(Teachers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

// Get a specific teacher by ID
exports.getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teacher" });
  }
};

exports.getCoursesByInstructorId = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the instructor by username
    const instructor = await Teacher.findById(id);
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    // Find courses associated with the instructor
    const courses = await Course.find({instructor : id});
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

// Update a teacher by ID
exports.updateTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: "Error updating teacher" });
  }
};

// Delete a teacher by ID
exports.deleteTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(deletedTeacher);
  } catch (error) {
    res.status(500).json({ error: "Error deleting teacher" });
  }
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "365d",
  });
};