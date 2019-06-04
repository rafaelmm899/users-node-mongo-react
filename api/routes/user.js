'use strict'

const express = require('express');
var authenticated = require('../middlewares/authenticated');
var userController = require('../controllers/user');

var api = express.Router();

api.post('/user-create',[authenticated.ensureAuth],userController.create);
api.post('/login', userController.login);

module.exports = api;