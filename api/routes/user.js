"use strict";

const express = require("express");
var authenticated = require("../middlewares/authenticated");
var userController = require("../controllers/user");

var api = express.Router();

api.post("/user-create", userController.create);
api.post("/login", userController.login);
api.post("/users", userController.findAll);
api.put("/user-update/:id", userController.update);
api.delete("/user-delete/:id", userController.remove);

module.exports = api;
