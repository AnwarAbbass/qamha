const { questions } = require("../models/index.js");
const db = require("../models/index.js");

const Exam = db.exams;
const Examresult = db.examresults;
const Question = db.questions;

// Get all exams from db
exports.getAll = (req, res) => {
  Exam.find()
    .populate("specialization_id")
    .populate("course_id")
    .populate("teacher_id")
    .populate("questions")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};

// Get all exams by teacher id
exports.getAllByTeacherId = (req, res) => {
  Exam.find({ teacher_id: req.params.teacher_id })
    .populate("specialization_id")
    .populate("course_id")
    .populate("teacher_id")
    .populate("questions")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};

// Get all exams by type (quiz/final)
exports.getAllByType = (req, res) => {
  if (req.params.exam_type !== "quiz" && req.params.exam_type !== "final") {
    res.status(400).send({
      message: "Type no found.",
    });
  } else {
    Exam.find({ exam_type: req.params.exam_type })
      .populate("specialization_id")
      .populate("course_id")
      .populate("teacher_id")
      .populate("questions")
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Exams.",
        });
      });
  }
};

// Get all exams by exam id
exports.getExamById = (req, res) => {
  Exam.findOne({ _id: req.params.exam_id })
    .populate("specialization_id")
    .populate("course_id")
    .populate("teacher_id")
    .populate("questions")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};

// Get all exams by course id
exports.getExamByCourseId = (req, res) => {
  if (req.params.exam_type !== "quiz" && req.params.exam_type !== "final") {
    res.status(400).send({
      message: "Type no found.",
    });
  } else {
    Exam.find({
      course_id: req.params.course_id,
      exam_type: req.params.exam_type,
    })
      .populate("specialization_id")
      .populate("course_id")
      .populate("teacher_id")
      .populate("questions")
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.send({ message: "no data" });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Exams.",
        });
      });
  }
};

// Create and Save a new exam
exports.createExam = (req, res) => {
  const exam = new Exam(req.body);
  exam.save().then(() => {
    res.status(200).json({
      message: "exam added successfully",
      exam: exam,
    });
  });
};

// Calculate student score
exports.getExamScore = async (req, res) => {
  let score = {};
  let total = {};
  let finalScore = 0;
  let total_sum_points = 0;
  let resources = [];
  let results = req.body.results;

  const my_promises = results.map(async (question) => {
    return {
      question_data: await Question.findOne({
        _id: question.questions_id,
      }).exec(),
      answer_index: question.answer_index,
    };
  });

  Promise.all(my_promises)
    .then((questions) => {
      questions.map((item) => {
        let question = item.question_data;
        let values = Object.values(question.question_topic)
          .join()
          .replace(/[,-:]/g, "");
        if (question.question_correct_answer == item.answer_index) {
          // correct answer
          if (!score.hasOwnProperty(values)) {
            score[values] = question.question_point;
            total[values] = question.question_point;
          } else {
            score[values] += question.question_point;
            total[values] += question.question_point;
          }

          finalScore += question.question_point;
          total_sum_points += question.question_point;
        } else {
          // wrong answer
          if (!score.hasOwnProperty(values)) {
            score[values] = 0;
            total[values] = question.question_point;
          } else {
            score[values] += 0;
            total[values] += question.question_point;
          }
          finalScore += 0;
          total_sum_points += question.question_point;
          resources.push({
            resource: question.question_resources,
            chapter: question.question_chapter,
            topic: question.question_topic,
          });
        }
      });

      for (val in score) {
        if (score[val] > 0) {
          score[val] = (score[val] / total[val]) * 100;
        }
      }
      console.log("score from line 182", score);
      console.log("total from line 182", total);
      finalScore = (finalScore / total_sum_points) * 100;
      let msg = finalScore > 50 ? "Congrats!!" : "try again for the best!";

      const exam_result = new Examresult({
        student_id: req.body.student_id,
        exam_id: req.body.exam_id,
        avg: finalScore,
        topic: score,
        resources: resources,
        message: msg,
      });
      exam_result.save().then((new_exam_result) => {
        res.status(200).json({
          message: msg,
          topic: score,
          avg: finalScore,
          resources: resources,
          exam_result_id: new_exam_result._id,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all exams results by id
exports.getExamResultById = (req, res) => {
  Examresult.findOne({ _id: req.params.exam_result_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exams.",
      });
    });
};
