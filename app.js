require('dotenv').config();

const connectDb = require('./config/db.config');
connectDb();

const express = require('express');
const app = express();

// Middleware que vai permitir que o express interprete um body se ele for json type
app.use(express.json());

// const cors = require('cors');

app.use('/users', require('./routes/user.routes'));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})