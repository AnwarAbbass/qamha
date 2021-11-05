module.exports = (app) => {
  const controller = require("../controllers/exam.controller");

  var router = require("express").Router();

  // GET
  router.get("/", controller.getAll);
  router.get("/teacher/:teacher_id", controller.getAllByTeacherId);
  router.get("/type/:exam_type", controller.getAllByType);
  router.get("/:exam_id", controller.getExamById);
  router.get(
    "/course/:course_id/type/:exam_type",
    controller.getExamByCourseId
  );
  router.get("/result/:exam_result_id", controller.getExamResultById);

  // POST
  router.post("/create", controller.createExam);
  router.post("/score", controller.getExamScore);

  app.use("/api/exam", router);
};
