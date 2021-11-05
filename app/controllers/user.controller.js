const db = require("../models");
const User = require('../models/user.model.js');
const Specialization = db.specializations;

// RETURN ALL USERS
exports.getAllUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

// SIGNUP
exports.signup = async (req,res) => {
  console.log('from google',req.body);
  const user = new User({
    user_type: req.body.user_type,
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    specialization_id: req.body.specialization_id,
    teacher_courses: req.body.teacher_courses,
    organization: req.body.organization,
  });
  user.token = user.token;
  let result = await Specialization.findOne({
    _id: req.body.specialization_id,
  })
    
      if (result) {
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (user.password.length > 6 && format.test(user.password)) {
          let userRecord = await user.save();
          let data = {
            userRecord:userRecord,
            token:user.token,
          }
            console.log('data from database',data);
            Specialization.updateOne(
              { $push: { users: user._id } },
              function (err) {
                if (err) {
                  res.status(400).json({
                    message: err,
                  });
                } else {
                  res.send(data);
                }
              }
            );
        } else {
          res.status(404).send({
            message:
              "password must contain special characters and more than 6 digits.",
          });
        }
      } else {
        res.status(400).json({
          message: "No document matches the provided query",
        });
      }
      return result;
    // .catch((err) => console.error(`Failed to find document: ${err}`));
};

// LOGIN
exports.login =(req, res) => {
  const user_params = {
    full_name: req.user.full_name,
    email:req.user.email,
    token:req.user.token,
  };
  console.log(req.user);
  try {
    res.status(200).send(user_params);
  } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    };
};

// UPDATE STUDENT PROFILE
exports.updateStudentData = (req, res) => {
  User.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
    if (!err) {
      res.send(req.body);
    } else {
      res.status(400).json({
        message: "No document matches the provided query",
      });
    }
  });
};

// UPDATE TEACHER PROFILE
exports.updateTeacherData = (req, res) => {
  User.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
    if (!err) {
      res.send(req.body);
    } else {
      res.status(400).json({
        message: "No document matches the provided query",
      });
    }
  });
};
