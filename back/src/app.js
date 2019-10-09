'use strict'

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const petRouter = require('./petRouter.js')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(petRouter);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Lets do this on ${port}`));
  }
}