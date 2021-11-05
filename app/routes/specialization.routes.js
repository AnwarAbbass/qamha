module.exports = (app) => {
  const controller = require("../controllers/specialization.controller.js");

  var router = require("express").Router();

  // GET
  router.get("/", controller.getAll);

  // POST
  router.post("/create", controller.createSpecialization);

  app.use("/api/specialization", router);
};
