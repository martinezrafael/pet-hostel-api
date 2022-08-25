require('dotenv').config();

const connectDb = require('./config/db.config');
connectDb();

const express = require('express');
const app = express();

const cors = require('cors');

// Middleware que vai permitir que o express interprete um body se ele for json type
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/pets', require('./routes/pet.routes'));
app.use('/spaces', require('./routes/space.routes'));
app.use('/reviews', require('./routes/review.routes'));
app.use('/wallet', require('./routes/wallet.routes'));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})