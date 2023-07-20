const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

// GET all thoughts
router.get('/thoughts', getAllThoughts);

// GET a single thought by its _id
router.get('/thoughts/:id', getThoughtById);

// POST a new thought
router.post('/thoughts', createThought);

// PUT to update a thought by its _id
router.put('/thoughts/:id', updateThought);

// DELETE to remove a thought by its _id
router.delete('/thoughts/:id', deleteThought);

// POST to create a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', createReaction);

// DELETE to remove a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
