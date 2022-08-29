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


//buscar usuários pelo preço
router.get('/searchUser/price', async (req, res) => {
  const { price } = req.body;

  try {
    const user = await User.find({price: { $lte: price }});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message})
  }

})

//buscar usuários pelo score
router.get('/searchUser/score', async (req, res) => {
  const { score } = req.body;

  try {
    const user = await User.find({score: { $gte: score }});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message})
  }

})


router.get('/searchUser/address', async (req, res) => {
    
})




module.exports = router;