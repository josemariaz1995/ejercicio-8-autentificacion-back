require("dotenv").config();
const express = require("express");
require("./servidor");
require("./db");

const cors = require("cors");

const app = express();
app.use(cors());
