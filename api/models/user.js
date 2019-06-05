'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:  {
        type : String,
        required: true
    },
    lastname: {
        type : String,
        required: true
    },
    email:   {
        type : String,
        index: true,
        unique : true
    },
    password: {
        type : String,
        required: true
    },
    dedication:{
        type : String,
        required: true
    },
    birthdate: { type: Date },
    city: {
        type : String,
        required: true
    },
    country: {
        type : String,
        required: true
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;