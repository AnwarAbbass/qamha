"use strict";

const base64 = require("base-64");
const User = require('../../models/user.model.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next("authorization header is not provided");
  } else {
  try {
    const basic = req.headers.authorization.split(" ").pop();
    const [email, password] = base64.decode(basic).split(":");
    const authenticatedUser = await User.authenticateBasic(email, password);
    req.user = authenticatedUser;
    console.log('req.user from middleware',req.user);
    next();
  } catch (error) {
    next(error.message);
  }
}

};
