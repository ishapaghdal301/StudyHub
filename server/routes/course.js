// let path=require('path');
let coursemodel = require("../models/Course");
let usermodel = require("../models/User");
let catmodel = require("../models/Category");
let express = require("express");
let router = express.Router();

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

router.post("/courses", async(req, res, next) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  try {
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

module.exports = router;
