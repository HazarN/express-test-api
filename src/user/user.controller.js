const sql = require('../../db');
const exceptions = require('../exceptions');

const bcrypt = require('bcrypt');

function getUsers(req, res) {
  sql`SELECT * FROM users;`
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);

      exceptions.InternalServerError(res);
    });
}

function getUserById(req, res) {
  const userId = req.params.id;

  sql`SELECT * FROM users WHERE id = ${userId};`
    .then(user => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        exceptions.NotFound(res);
      }
    })
    .catch(err => {
      console.log(err);

      exceptions.InternalServerError(res);
    });
}

function addUser(req, res) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) return exceptions.BadRequest(res);

  const created_at = new Date();
  const updated_at = created_at;
  const hashedPassword = bcrypt.hashSync(password, 10);

  sql`INSERT INTO users (username, password, email, created_at, updated_at)
        VALUES (${username}, ${hashedPassword}, ${email}, ${created_at}, ${updated_at});`
    .then(() => {
      res.status(201).json({
        message: 'User created successfully',
      });
    })
    .catch(err => {
      if (err.code === '23505') return exceptions.Conflict(res);
      else exceptions.InternalServerError(res);
    });
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
};
