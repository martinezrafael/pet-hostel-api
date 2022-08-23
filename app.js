require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})