const usersRouter = require('express').Router();
const { userLogin, userRegister } = require('../utils/helpers');

const usersRouterWrapper = (db) => {

  // login
  usersRouter.post('/login', (req, res) => {
    const { username, password } = req;
    
    const queryString = `
      SELECT * FROM users;
    `
    // return the user entry if applicable
    db
      .query(queryString)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json(err.stack));
  });

  // render login page
  usersRouter.get('/login', (req, res) => {
    

  });

  // register
  usersRouter.post('/register', (req, res) => {
    const { username, password } = req;
    
    const queryString = `
      SELECT * FROM users;
    
    `
    // return the user entry if applicable
    db
      .query(queryString)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json(err.stack));
  });

  // render register
  usersRouter.get('/register', (req, res) => {

  });

  // // profile page DO LATER!
  // usersRouter.post('/profile', (req, res) => {
    
  // });

  return usersRouter;
};

module.exports = usersRouterWrapper;