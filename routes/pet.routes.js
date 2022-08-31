const { Router } = require('express');
const Pet = require('../models/Pet.model');
const User = require('../models/User.model');

const router = Router();

//Criar um novo pet
router.post('/newPet', async (req, res) => {

  const {
    name,
    about,
    size,
    castrated,
    vaccinated,
    temperament,
    type
  } = req.body;

  const { userName, id } = req.user;

  try {

    if(!name || !about || !size || !castrated || !vaccinated ||!temperament || !type) {
      throw new Error('Preencha todos os campos');
    }

   const newPet = await Pet.create(
    {
      name,
      about,
      size,
      castrated,
      vaccinated,
      temperament,
      type,
      owner: id
    }
   )

   const userUpdate = await User. findOneAndUpdate(
    {userName},
    {$push: {pets: newPet}},
    { new: true }
   )

   res.status(201).json({
    name: newPet.userName,
    about: newPet.about,
    size: newPet.size,
    castrated: newPet.castrated,
    vaccinated: newPet.vaccinated,
    temperament: newPet.temperament,
    type: newPet.type,
    owner: newPet.owner
   })


  } catch (error) {
    res.status(400).json({msg: error.message});
  }

})


//listar pets
router.get('/myPets', async (req, res) => {
  const { id } = req.user;
  
  try {
    const petsUserFomDb = await Pet.find({owner: id});

    for (let pet of petsUserFomDb){
      let petOwnerStr = pet.owner.toString();
      
      if(petOwnerStr === id){
        res.status(200).json(petsUserFomDb);
      }

    }
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


//Atualiza um pet
router.put('/petUpdate/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const updatePet = await Pet.findByIdAndUpdate(id, payload, {new: true});
    res.status(200).json(updatePet);
  } catch (error) {
    res.status(500).json({error: error.message})
  }

})

//Deleta um pet
router.delete('/petDelete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Pet.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({error: error.message})
  }

})


module.exports = router;