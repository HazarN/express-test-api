const sql = require('../../db');
const { getUsers, getUserById, addUser } = require('./user.controller');

const express = require('express');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);

router.post('/', addUser);

module.exports = router;
