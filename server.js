const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

//Database connection
const dbURI = process.env.DB_CONNECTION;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });
require("./app/routes/user.routes")(app);
require("./app/routes/specialization.routes")(app);
require("./app/routes/course.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/exam.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
