const { Router } = require('express');
const Space = require('../models/Space.model');

const router = Router();

//Cria novo espaço
router.post('/', async (req, res) => {
  const payload = req.body;

  try {
    const newSpace = await Space.create(payload);
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//Busca todos os espaços
router.get('/', async (req, res) => {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Busca um espaço por Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const space = await Space.findById(id);
    res.status(200).json(space);
  } catch (error) {
    
  }
})

//Atualiza um espaço
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let updatedSpace = await Space.findOneAndUpdate({ _id:id }, payload, { new: true });
    res.status(200).json(updatedSpace);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Deleta um espaço
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Space.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;