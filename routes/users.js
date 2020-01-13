const usersRouter = require('express').Router();
const { userLogin, userRegister } = require('../utils/helpers');

const usersRouterWrapper = (db) => {

  // login
  usersRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const queryParams = [username];

    const queryString = `
      SELECT * FROM users
      WHERE username = $1;
    `
    // return the user entry if applicable
    db
      .query(queryString, queryParams)
      .then((data) => {
        const user = data.rows[0];
        const loggedIn = userLogin(password, user.password);
        if (loggedIn) {
          res.json(user);
        } else {
          res.status(400).json({ error: 'unauthenticated' })
        }
      })
      .catch(err => res.status(400).json(err.stack));
  });

  // register
  usersRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    const queryParams = [username];
    
    // Check if username is already taken
    const queryString = `
      SELECT * FROM users
      WHERE username = $1;
    `
    const insertString = `
      INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
    `
    db
      .query(queryString, queryParams)
      .then((data) => {
        if (!data.rows[0]) {
          const insertData = [username, userRegister(password)];
          db
            .query(insertString, insertData)
            .then((data) => res.status(200).json(data.rows[0]));
        } else {
          res.status(500).json({ error: 'username already taken' });
        }
      })
      .catch(err => console.log(err.stack));
  });

  return usersRouter;
};

module.exports = usersRouterWrapper;