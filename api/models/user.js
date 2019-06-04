'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  lastname: String,
  email:   {
    type : String,
    index: true,
    unique : true
  },
  password: String,
  dedication:String,
  birthdate: { type: Date },
  city: String,
  country: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;