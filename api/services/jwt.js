'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(user) {
  var payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    dedication:user.dedication,
    birthdate: user.birthdate,
    city: user.city,
    country: user.country,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};