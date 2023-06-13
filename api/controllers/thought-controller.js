const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET a single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST to create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this username!' });
          return;
        }
        res.json({ message: 'Thought created successfully!' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update a thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        return User.findOneAndUpdate(
          { username: thoughtData.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought deleted successfully!' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // POST to create a reaction stored in a single thought's reactions array field
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
