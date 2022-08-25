const { Router } = require('express');
const User = require('../models/User.model');

const router = Router();

//Buscar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
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

//Atualiza um usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let updatedUser = await User.findOneAndUpdate({ _id:id }, payload, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Deleta um usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;