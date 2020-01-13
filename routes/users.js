const usersRouter = require('express').Router();
const { userLogin, userRegister } = require('../utils/helpers');

const usersRouterWrapper = (db) => {

  // login
  usersRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const queryParams = [username];
    console.log(username, password, queryParams);

    const queryString = `
      SELECT * FROM users
      WHERE username = $1;
    `
    // return the user entry if applicable
    db
      .query(queryString, queryParams)
      .then((data) => {
        console.log(data.rows);
        res.status(200).json(data.rows)
      })
      .catch(err => res.status(400).json(err.stack));
  });

  // register
  usersRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    const queryString = `
      SELECT * FROM users;
    
    `
    // return the user entry if applicable
    db
      .query(queryString)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json(err.stack));
  });

  // // profile page DO LATER!
  // usersRouter.post('/profile', (req, res) => {
    
  // });

  return usersRouter;
};

module.exports = usersRouterWrapper;