require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
const dbURI = process.env.DB_CONNECTION;

db.mongoose = mongoose;
db.url = dbURI;
db.users = require("./user.model.js")(mongoose);
db.specializations = require("./specialization.model.js")(mongoose);
db.questions = require("./question.model.js")(mongoose);
db.courses = require("./course.model.js")(mongoose);
db.exams = require("./exam.model.js")(mongoose);
db.examresults = require("./examresult.model.js")(mongoose);

module.exports = db;
