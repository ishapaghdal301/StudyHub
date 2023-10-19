let coursemodel = require("../models/Course");
let catmodel = require("../models/Category");
let express = require("express");
let enrollment = require("../models/Enrollment");
const Category = require("../models/Category");
const { json } = require("body-parser");
let router = express.Router();

router.post("/allcategories", async (req, res) => {
  try {
    const allcategories = await Category.find();
    res.status(200).json(allcategories); // Corrected response status and field name
  } catch (err) {
    res.status(500).send({ error: "Some error occurred" });
  }
});


router.post("/coursesbycategory", async (req, res) => {
  try {
    const id = req.body.categoryId;
    const courses = await coursemodel.find({ category: id });
    console.log(courses);
    res.status(200).json(courses);
  } catch (err) {
    return res.status(500).send({ error: "Some error ouccured" });
  }
});

coursemodel
  .ensureIndexes()
  .then(() => {
    console.log("Indexes created successfully.");
  })
  .catch((err) => {
    console.error("Error creating indexes:", err);
  });

router.post("/course/add", async (req, res) => {
  //req.body
  // console.log(req.body.price);
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json("request body is missing");
  }
  // let model=new coursemodel(req.body)
  // function(err, model){
  //     if(!err, model){

  const cat =await catmodel.find({ _id: req.body.category })
    console.log(cat);
      if (cat) {
        console.log("Cat printed" + cat);
        req.body.category = cat._id;

        console.log("Instructor Id" + req.body.instructor);
        const model = new coursemodel(req.body);

        const doc = await model.save();

        if (!doc || doc.length === 0) {
          return res.status(500).send(doc);
        }

        res.status(200).json(doc);
        console.log("Doc Printed" + doc);
      }
    });


router.get("/course/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/courses", async (req, res, next) => {
  try {
    // console.log(req.body.instructor);
    const courses = await coursemodel.find({ instructor: req.body.instructor });

    if (courses) {

      console.log(courses);
      res.status(200).json(courses);
    } else {
      return res.status(500).send({ error: "No course found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Some error ouccured" });
  }
});

router.post("/student/courses", async (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log(req.body);
  try {
    const courses = await enrollment
      .find({ student: req.body.studentId })
      .populate({ path: "course", model: "course" })
      .exec();

      const populatedCourses = courses.map((enrollment) => enrollment.course);

    if (populatedCourses) {
      console.log(populatedCourses);
      res.status(200).json(populatedCourses);
    } else {
      return res.status(500).send({ error: "No course found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Some error ouccured" });
  }
});

router.get("/course", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOne({
      _id: req.query.id,
    })

    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/allcourses", async (req, res, next) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  try {
    const courses = await coursemodel.find();

    if (courses) {
      res.status(200).json(courses);
    } else {
      return res.status(500).send({ error: "No course found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Some error ouccured" });
  }
});

router.post("/categories", async (req, res, next) => {
  try {
    const categories = await Category.find().limit(5);

    if (categories) {
      console.log(categories);
      res.status(200).json(categories);
    } else {
      return res.status(500).send({ error: "No course found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Some error ouccured" });
  }
});

router.get("/course", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOne({
      _id: req.query.id,
    })

    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get courses by instructor id
router.get("/coursebyinstructor", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .find({
      instructor: req.query.id,
    })

    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/course/", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOneAndUpdate(
      {
        _id: req.query.id,
      },
      req.body,
      {
        new: true,
      }
    )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/course", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  coursemodel
    .findOneAndRemove({
      _id: req.query.id,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request URL
    const courses = await coursemodel.find({
      $or: [
        { courseName: { $regex: query, $options: "i" } }, // Case-insensitive search for courseName
        { courseDescription: { $regex: query, $options: "i" } }, // Case-insensitive search for courseDescription
        // { instructor: { $regex: query, $options: "i" } }, // Case-insensitive search for instructor
      ],
    });

    console.log(courses);
    res.json(courses); // Return the matching courses as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/searchByInstructor", async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request URL
    const instructorId = req.query.i;
    console.log(instructorId);
    const courses = await coursemodel.find({
      instructor: instructorId,
      $or: [
        { courseName: { $regex: query, $options: "i" } }, // Case-insensitive search for courseName
        { courseDescription: { $regex: query, $options: "i" } }, // Case-insensitive search for courseDescription
        // { instructor: { $regex: query, $options: "i" } }, // Case-insensitive search for instructor
      ],
    });

    console.log(courses);
    res.json(courses); // Return the matching courses as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
