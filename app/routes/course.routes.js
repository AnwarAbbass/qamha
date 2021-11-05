module.exports = (app) => {
  const controller = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // GET
  router.get("/:specialization_id", controller.getAllById);
  router.get("/teacher/:teacher_id", controller.getAllByTeacherId);

  // POST
  router.post("/create/:specialization_id", controller.createCourse);

  app.use("/api/course", router);
};
