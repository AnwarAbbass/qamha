module.exports = (app) => {
  const controller = require("../controllers/question.controller");

  var router = require("express").Router();

  // GET
  router.get("/", controller.getAll);
  router.get("/teacher/:teacher_id", controller.getAllQuestionsByTeacherId);
  router.get("/course/:course_id", controller.getAllQuestionsByCourseId);
  
  // Put
  router.put("/editQuestion", controller.editQuestion);

  // Delete 
  router.delete("/deleteQuestion", controller.deleteQuestion);

  // POST
  router.post("/create", controller.createQuestion);

  app.use("/api/question", router);
};
