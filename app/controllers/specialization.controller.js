const db = require("../models");

const Specialization = db.specializations;

// Get all specialization from db
exports.getAll = (req, res) => {
  Specialization.find()
    .populate("courses")
    .populate("users")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Specializations.",
      });
    });
};

// Create and Save a new specialization
exports.createSpecialization = (req, res) => {
  const specialization = new Specialization({
    specialization_name_ar: req.body.specialization_name_ar,
    specialization_name_en: req.body.specialization_name_en,
  });
  specialization.save().then(() => {
    res.status(201).json({
      message: "specialization added successfully",
      specialization: specialization,
    });
  });
};
