require('dotenv').config();

const connectDb = require('./config/db.config');
connectDb();

const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();

const cors = require('cors');

// Middleware que vai permitir que o express interprete um body se ele for json type
app.use(express.json());
app.use(cors());

//rotas públicas
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.list.routes'));

//midlleware de autorização
app.use(require('./middlewares/auth.middleware'));

// rotas privadas
app.use('/user', require('./routes/user.edit.routes'))
app.use('/pets', require('./routes/pet.routes'));
app.use('/reviews', require('./routes/review.routes'));
app.use('/myWallet', require('./routes/wallet.routes'));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})