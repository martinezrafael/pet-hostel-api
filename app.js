require('dotenv').config();

const connect = require('./config/db.config');
connect();

const express = require('express');
const cors = require('cors');


const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})