const { Router } = require('express');
const User = require('../models/User.model');

const router = Router();

//Rota para criação de um novo usuário
router.post('/user', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

module.exports = router;