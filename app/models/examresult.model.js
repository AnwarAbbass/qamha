module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    exam_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    avg: {
      type: Number,
      required: true,
    },
    resources: {
      type: Array,
      required: true,
    },
    topic: {
      type:Object,
      required:true,
    },
    message: {
      type: String,
      required: true,
    },
  });

  const Examresult = mongoose.model("examresult", schema);
  return Examresult;
};
