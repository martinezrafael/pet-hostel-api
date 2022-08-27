const { Router } = require('express');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = Router();

//Cadastrar um usuário
router.post('/signup', async (req, res) => {
  const { userName, email, password } = req.body;

  try {

    if(!userName || !email || !password){
      throw new Error('Preencha todos os campos');
    }

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
    )

    res.status(201).json({
      userName: newUser.userName,
      email: newUser.email,
    })

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

    const payload = {
      userName
    }

    const token = jwt.sign(
      payload,
      process.env.SECRET_JWT, 
      {expiresIn: '10m'}
    );

    res.status(200).json({payload, token});

  } catch (error) {
    res.status(401).json({msg: error.message});
  }
})

module.exports = router;