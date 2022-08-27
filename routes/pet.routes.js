const { Router } = require('express');
const Pet = require('../models/Pet.model');
const User = require('../models/User.model');

const router = Router();

//usuário logado cria um novo pet
router.post('/cadastroPet', async (req, res) => {
  const payload = req.body;
  const { userName } = req.user;

  try {
    const newPet = await Pet.create(payload);

    const updateUser = await User.findOneAndUpdate(
      { userName },
      { $push: {pets: newPet._id} },
      { new: true }
    )
    .select('-password')
    .populate('pets');

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//buscar pets do usuário cadastrado
router.get('/myPets', async (req, res) => {
  const { userName } = req.user;

  try {
    const user = await User.findOne({ userName }).populate('pets');

    if(!user.pets.length){
      return res.status(200).json({msg: 'nenhum pet cadastrado'})
    }

    res.status(200).json(user.pets);
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