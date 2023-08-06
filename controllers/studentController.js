// controllers/studentController.js
const Student = require('../models/student');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//REGISTER STUDENT
exports.createStudent = async (req, res) => {
  try {
    const { fname, lname, emailId, mobileNo, username, password, profilePicture } = req.body;

    if (!fname || !lname || !emailId || !mobileNo || !username || !password)
    return res.status(400).json({ msg: "Please fill in all fields." });

    if (!validateEmail(emailId))
      return res.status(400).json({ msg: "Invalid email" });

    const student = await Student.findOne({ username });
    if (student)
      return res.status(400).json({ msg: "This username already exists." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });

    // const passwordHash = await bcrypt.hash(password, 12);

    const newStudent = new Student({ fname, lname, emailId, mobileNo, username, password, profilePicture });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//LOGIN STUDENT
exports.loginStudent = async (req, res) => {
  try {
    const {username, email, password } = req.body;
    const student = await Student.findOne({
      username: username,
    });
    if (!student)
      return res.status(400).json({ msg: "That username doesn't exist." });
    const isPasswordCorrect = (student.password == password);
    // await bcrypt.compare(
    //   password,
    //   student.password
    // );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials" });

      const refresh_token = createRefreshToken({ id: student._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 7 days
      });

    //login sucsess
    res.status(200).json({ student });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

exports.logoutStudent = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching students' });
  }
};

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ msg:err.message });
  }
};

// Update a student by ID
exports.updateStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ msg:error.message });
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
    res.status(500).json({ msg:error.msg });
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