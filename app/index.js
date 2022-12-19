const express = require('express');
const app = express();
const router = require('../config/router');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(router);

module.exports = app;