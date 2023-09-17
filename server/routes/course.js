let coursemodel = require("../models/Course");
let catmodel = require("../models/Category");
let express = require("express");
let router = express.Router();

router.post("/coursesbycategory", async (req, res) => {
  try {
    const id = req.body.categoryId;
    const courses = await coursemodel.find({ category: id });
    console.log(courses);
    res.status(200).json(courses);
  }
  catch (err) {
    return res.status(500).send({ error: "Some error ouccured" });
  }
});

coursemodel.ensureIndexes()
  .then(() => {
    console.log("Indexes created successfully.");
  })
  .catch((err) => {
    console.error("Error creating indexes:", err);
  });

router.post("/course/add", async (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).json("request body is missing");
  }
  console.log(req.body);
  // let model=new coursemodel(req.body)
  // function(err, model){
  //     if(!err, model){

  await catmodel
    .findOne({ categoryName: req.body.category })
    .then(async (cat) => {
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
});

router.post("/courses", async (req, res, next) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  try {
    const courses = await coursemodel.find({ instructor: req.body.instructor });

    if (courses) {
      console.log("hello");
      console.log(courses);
      res.status(200).json(courses);
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
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  try {
    const categories = await Category.find();

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

module.exports = router;