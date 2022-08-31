const { Router } = require('express');
const Wallet = require('../models/Wallet.model');

const router = Router();

//Criar uma nova Wallet
router.post('/', async (req, res) => {
  const payload = req.body;

  try {
    const newWallet = await Wallet.create(payload);
    res.status(201).json(newWallet);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//Atualiza uma Wallet
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let updatedWallet = await Wallet.findOneAndUpdate({ _id:id }, payload, { new: true });
    res.status(200).json(updatedWallet);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;