const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

// GET all users
router.get('/users', getAllUsers);

// GET a single user by its _id and populated thought and friend data
router.get('/users/:id', getUserById);

// POST a new user
router.post('/users', createUser);

// PUT to update a user by its _id
router.put('/users/:id', updateUser);

// DELETE to remove a user by its _id
router.delete('/users/:id', deleteUser);

// POST to add a friend to a user's friend list
router.post('/users/:userId/friends/:friendId', addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', removeFriend);

module.exports = router;
