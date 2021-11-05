const controller = require("../controllers/user.controller.js");
const basicAuth = require('../auth/middleware/basic.js');
const bearerAuth = require('../auth/middleware/bearer.js');
module.exports = (app) => {

  var router = require("express").Router();

  // GET
  router.get("/", controller.getAllUsers);

  // POST
  router.post("/signup",controller.signup);
  router.post("/login", basicAuth ,controller.login);

  //PUT
  router.put("/update-student-profile", bearerAuth ,controller.updateStudentData);
  router.put("/update-teacher-profile", bearerAuth ,controller.updateTeacherData);

  app.use("/api/user", router);
};
