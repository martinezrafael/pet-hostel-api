const { Router } = require('express');
const Review = require('../models/Review.model');

const router = Router();

//Crar novo review
router.post('/', async(req, res) => {
  const payload = req.body;

  try {
    const newReview =  await Review.create(payload);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

//Buscar todos os reviews
router.get('/', async(req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Atualiza um review
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let updatedReview = await Review.findOneAndUpdate({ _id:id }, payload, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//Deletar um review
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Review.findByIdAndDelete(id);
    res.status(204).json()
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;