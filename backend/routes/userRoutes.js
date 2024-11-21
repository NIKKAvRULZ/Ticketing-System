const express = require('express');
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET a single user by ID
router.get('/:id', getUserById);

// POST a new user
router.post('/', createUser);

// PUT to update a user by ID
router.put('/:id', updateUser);

// DELETE a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
