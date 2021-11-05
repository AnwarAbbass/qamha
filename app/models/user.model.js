const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const mongoose = require('mongoose');
  var schema = new mongoose.Schema({
    user_type: {
      type: String,
      required: true,
      // default:"student",
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    specialization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
    },
    teacher_courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    organization: {
      type: String,
      required: true,
    },
  });

  schema.virtual("token").get(function () {
    let result = jwt.sign({ email: this.email }, SECRET);
    return result;
  });

  schema.pre("save", async function () {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  });

  schema.statics.authenticateBasic = async function (email, password) {
    try {
      const user = await this.findOne({ email:email });
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      } else {
        throw new Error("Invalid user!!!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  schema.statics.authenticateBearer = async function (token) {
    try {
      const payload = jwt.verify(token, SECRET);
      // console.log("payload", payload);
      const user = await this.findOne({
        email: payload.email,
      });
      // console.log("user", user);

      if (user) {
        return user;
      } else {
        throw new Error("invalid username from token");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  module.exports = mongoose.model("User", schema);
