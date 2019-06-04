'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
  next();
})

app.use('/api',userRoute);
module.exports = app;