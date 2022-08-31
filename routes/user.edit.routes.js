const { Router } = require('express');
const User = require('../models/User.model');

const router = Router();


//Atualiza um usuário
router.put('/userUpdate/:userId', async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  const { id } = req.user;

  try {

    if (userId === id){
      const userUpdate = await User.findByIdAndUpdate(userId, payload, { new: true });
      return res.status(200).json(userUpdate);
    }

    throw new Error('Você não pode alterar essas informações');

  } catch (error) {
    res.status(500).json({message: error.message});
  }


})


//Deleta um usuário
router.delete('deleteProfile/:id', async (req, res) => {
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