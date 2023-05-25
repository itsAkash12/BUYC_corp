const express = require("express");

const { Router } = require("express");
const { body } = require("express-validator");
const signupAuth = require("../controllers/auth/Signup.controller");
const loginAuth = require("../controllers/auth/Login.controller");

const auth = Router();

auth.route("/signup").post(
  [
    body("first_name", "Enter your first name").not().isEmpty(),
    body("last_name", "Enter your last name").not().isEmpty(),
    body("email", "Enter a vaild email").isEmail(),
    body("password", "Password length must be atleast 4").isLength({
      min: 8,
    }),
  ],
  signupAuth
);
auth.post("/login", loginAuth);

module.exports = auth;
