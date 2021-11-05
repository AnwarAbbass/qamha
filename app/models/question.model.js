const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    specialization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question_chapter: {
      type: Number,
      required: true,
    },
    question_topic: {
      type: String,
      required: true,
    },
    question_level: {
      type: String,
      required: true,
    },
    question_name: {
      type: String,
      required: true,
    },
    question_image: String,
    question_type: {
      type: String,
      required: true,
    },
    question_answers: {
      type: Array,
      required: true,
    },
    question_correct_answer: {
      type: String,
      required: true,
    },
    question_point: {
      type: Number,
      required: true,
    },
    question_resources: {
      type: Array,
      required: true,
    },
  });

  const Question = mongoose.model("Question", schema);
  return Question;
};
