const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    specialization_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    course_name: {
      type: String,
      required: true,
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });

  const Course = mongoose.model("Course", schema);
  return Course;
};
