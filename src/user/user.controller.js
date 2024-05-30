const sql = require('../../db');
const exceptions = require('../exceptions');

const bcrypt = require('bcrypt');

// GET
function getUsers(req, res) {
  sql`SELECT * FROM users;`
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);

      exceptions.InternalServerError(res);
    });
}

// GET
function getUserById(req, res) {
  const userId = Number.parseInt(req.params.id);

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

// POST
function addUser(req, res) {
  const created_at = new Date();
  const updated_at = created_at;

  const { username, password, email } = req.body;

  if (!username || !password || !email) return exceptions.BadRequest(res);

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

// PUT
function updateUser(req, res) {
  const updated_at = new Date();

  const userId = Number.parseInt(req.params.id);

  const { username } = req.body;

  sql`SELECT * FROM users WHERE id = ${userId};`
    .then(user => {
      if (user.length > 0) {
        return user[0].password;
      } else {
        exceptions.NotFound(res);
        throw new Error('User not found');
      }
    })
    .then(password => {
      if (username) {
        return sql`UPDATE users SET username = ${username}, updated_at = ${updated_at}
                WHERE id = ${userId};`.then(() => {
          res.status(200).json({
            message: 'User updated successfully',
          });
        });
      } else {
        // if there is no body, then hash the password
        sql`UPDATE users SET password = ${bcrypt.hashSync(
          password,
          10
        )}, updated_at = ${updated_at} 
        WHERE id = ${userId};`.then(() => {
          res.status(200).json({
            message: 'User updated successfully',
          });
        });
      }
    })
    .catch(err => {
      if (err.message === 'User not found') return;

      console.log(err);
      exceptions.InternalServerError(res);
    });
}

// DELETE
function removeUser(req, res) {
  const userId = Number.parseInt(req.params.id);

  sql`SELECT * FROM users WHERE id = ${userId};`
    .then(user => {
      if (user.length > 0)
        return sql`DELETE FROM users WHERE id = ${userId};`.then(() => {
          res.status(200).json({
            message: 'User deleted successfully',
          });
        });
      else {
        exceptions.NotFound(res);
        throw new Error('User not found');
      }
    })
    .catch(err => {
      if (err.message === 'User not found') return;

      console.log(err);
      exceptions.InternalServerError(res);
    });
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
