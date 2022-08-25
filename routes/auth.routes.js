const { Router } = require('express');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');


const router = Router();

//Cadastrar um usuário
router.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.findOne({userName})
    if(user) {throw new Error('Usuário Já existe')}
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create(
      {
        userName,
        email,
        password: passwordHash
      }
    );
    res.status(201).json({
      userName: newUser.userName,
      email: newUser.email,
    });
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
})

//fazer login
router.post('/login', async (req, res) => {
  const { userName, password } = req.body; 

  try {

    const user = await User.findOne({userName});

    if(!user) {
      throw new Error('Senha ou usuário inválido');
    }

    const compareHash = await bcrypt.compare(password, user.password);

    if(!compareHash) {
      throw new Error('Senha ou usuário inválido');
    }

    res.status(200).json({msg: `Usuário ${user.userName}, acessou!`});

  } catch (error) {
    res.status(401).json({msg: error.message});
  }
})

module.exports = router;