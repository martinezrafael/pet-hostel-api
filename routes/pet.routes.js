const { Router } = require('express');
const Pet = require('../models/Pet.model');

const router = Router();

//Criar novo pet
router.post('/', async (req, res) => {
  const payload = req.body;

  try {
    const newPet = await Pet.create(payload);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//Buscar todos os pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Buscar um pet por Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findById(id);
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Atualiza um pet
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let updatedPet = await Pet.findOneAndUpdate({ _id:id }, payload, { new: true })
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Deleta um pet
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Pet.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;