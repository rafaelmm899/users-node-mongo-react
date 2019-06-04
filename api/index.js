'use strict'

require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');
const port = 3789;


mongoose.connect('mongodb://127.0.0.1:27017/user01', {useNewUrlParser: true, useCreateIndex: true}).then(
  () => { 
    app.listen(port,() => {
      console.log('localhost is running');
    })
  },  
  err => { 
    throw err;
  }
);