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
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    exam_view: {
      type: String,
      required: true,
    },
    exam_link: {
      type: String,
    },
    exam_name: {
      type: String,
      required: true,
    },
    exam_type: {
      type: String,
      required: true,
    },
    exam_date: {
      type: Date,
      required: true,
    },
    exam_duration: {
      type: Number,
      required: true,
    },
  
  });

  const Exam = mongoose.model("exam", schema);
  return Exam;
};
