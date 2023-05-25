const express = require("express");

const {Router} = require("express");
const signupAuth = require("../controllers/auth/signup.controller");
const loginAuth = require("../controllers/auth/login.controller");

const auth = Router();

auth.get("/signup", signupAuth)
auth.get("/login", loginAuth)

module.exports = auth;