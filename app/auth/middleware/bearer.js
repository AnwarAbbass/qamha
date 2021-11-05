"use strict";
const User = require('../../models/user.model.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next("authorization header is not provided");
  } 
  try {
    console.log("Auth header: ", req.headers.authorization);
    const token = req.headers.authorization.split(" ").pop();
    console.log("token: ", token);

    const user = await User.authenticateBearer(token);
    console.log("user", user);

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next("Invalid token");
  }
};
