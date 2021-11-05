const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    specialization_name_ar: {
      type: String,
      required: true,
    },
    specialization_name_en: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  });

  const Specialization = mongoose.model("Specialization", schema);
  return Specialization;
};
