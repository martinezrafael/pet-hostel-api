const { Router } = require('express');
const User = require('../models/User.model');
const Pet = require('../models/Pet.model');

const router = Router();

//Buscar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).populate('pets');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Busca um usuário por Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


 
module.exports = router;