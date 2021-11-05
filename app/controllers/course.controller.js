const db = require("../models");

const Course = db.courses;
const User = db.users;
const Specialization = db.specializations;

// Get all Course by specialization id
exports.getAllById = (req, res) => {
  Course.find({ specialization_id: req.params.specialization_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Courses.",
      });
    });
};

// Get all Courses by teacher id
exports.getAllByTeacherId = (req, res) => {
  User.findOne({ _id: req.params.teacher_id })
    .populate("teacher_courses")
    .then((data) => {
      res.send(data.teacher_courses);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Courses.",
      });
    });
};

// Create and Save a new Course
exports.createCourse = (req, res) => {
  const course = new Course({
    course_name: req.body.course_name,
    specialization_id: req.params.specialization_id,
    teacher_id: req.body.teacher_id,
  });

  Specialization.findOne({
    _id: req.params.specialization_id,
  })
    .then((result) => {
      if (result) {
        course.save().then(() => {
          Specialization.updateOne(
            { $push: { courses: course._id } },
            function (err, result) {
              if (err) {
                res.status(400).json({
                  message: err,
                });
              } else {
                res.status(201).json({
                  message: "course added successfully",
                  course: course,
                });
              }
            }
          );
        });
      } else {
        res.status(400).json({
          message: "No document matches the provided query",
        });
      }
      return result;
    })
    .catch((err) => console.error(`Failed to find document: ${err}`));
};
