const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
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

module.exports = router;
