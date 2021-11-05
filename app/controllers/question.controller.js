const db = require("../models/index.js");

const Question = db.questions;

// RETURN ALL USERS
exports.getAll = (req, res) => {
  Question.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

// RETURN ALL questions by teacher id
exports.getAllQuestionsByTeacherId = (req, res) => {
  Question.find({ teacher_id: req.params.teacher_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

// RETURN ALL questions by course id
exports.getAllQuestionsByCourseId = (req, res) => {
  Question.find({ course_id: req.params.course_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};

// Create and Save a new Course
exports.createQuestion = (req, res) => {
  const question = new Question({
    specialization_id: req.body.specialization_id,
    course_id: req.body.course_id,
    teacher_id: req.body.teacher_id,
    question_chapter: req.body.question_chapter,
    question_topic: req.body.question_topic,
    question_level: req.body.question_level,
    question_name: req.body.question_name,
    question_point: req.body.question_point,
    question_image: req.body.question_image,
    question_type: req.body.question_type,
    question_correct_answer: req.body.question_correct_answer,
    question_answers: req.body.question_answers,
    question_resources: req.body.question_resources,
  });

  question.save().then((data) => {
    if (!data) {
      res.status(400).json({
        message: "Error when creating a question",
      });
    } else {
      res.status(201).json({
        message: "question added successfully",
        question: question,
        id:question._id,
      });
    }
  });
};

// Edit questions by id

exports.editQuestion = async (req, res) => {
  let id = req.body._id;
  try {
    let UpdatedQuestions = {
      specialization_id: req.body.specialization_id,
      course_id: req.body.course_id,
      teacher_id: req.body.teacher_id,
      question_chapter: req.body.question_chapter,
      question_topic: req.body.question_topic,
      question_level: req.body.question_level,
      question_name: req.body.question_name,
      question_point: req.body.question_point,
      question_image: req.body.question_image,
      question_type: req.body.question_type,
      question_correct_answer: req.body.question_correct_answer,
      question_answers: req.body.question_answers,
      question_resources: req.body.question_resources,
    }; 

    let updateEntry = await Question.findByIdAndUpdate(id, UpdatedQuestions, {
      new: true,
    });
    const response = {
      specialization_id: updateEntry.specialization_id,
      course_id: updateEntry.course_id,
      teacher_id: updateEntry.teacher_id,
      question_chapter: updateEntry.question_chapter,
      question_topic: updateEntry.question_topic,
      question_level: updateEntry.question_level,
      question_name: updateEntry.question_name,
      question_point: updateEntry.question_point,
      question_image: updateEntry.question_image,
      question_type: updateEntry.question_type,
      question_correct_answer: updateEntry.question_correct_answer,
      question_answers: updateEntry.question_answers,
      question_resources: updateEntry.question_resources,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error.message);
  }
};

// delete questions by id 

exports.deleteQuestion = async (req,res) => {
  let id = req.body._id;
  await Question.findByIdAndDelete(id);
}
