// controller end-points that will be used by the router

const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
} = require('./user.controller');

const express = require('express');

const router = express.Router();

// RESTful API pattern

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports = router;
