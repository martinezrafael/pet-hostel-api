const { Router } = require('express');
const User = require('../models/User.model');

const router = Router();


//Atualiza um usuário
router.put('/editUser/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { userName } = req.user;

  const userDb = await User.findOne({userName});

  try {

    if (id === userDb.id){
      let updatedUser = await User.findOneAndUpdate({ _id:id }, payload, { new: true });
      res.status(200).json(updatedUser);
    }

    throw new Error('Invalid user');

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Deleta um usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userName } = req.user;
  
  const userDb = await User.findOne({userName});

  try {
    
    if (id === userDb.id) {
      await User.findByIdAndDelete(id);
      res.status(204).json();
    }

    throw new Error('Usuário Inválido');

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


module.exports = router;