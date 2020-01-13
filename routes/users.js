const usersRouter = require('express').Router();
const { userLogin, userRegister } = require('../utils/helpers');

const usersRouterWrapper = (db) => {

  // TEST ROUTE - CAN REMOVE
  usersRouter.get('/', (req, res) => {
    // TEST API QUERY

    const queryString = `
      SELECT * FROM users;
    `
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });  

  // login
  usersRouter.post('/login', (req, res) => {
    // userLogin
  });

  // register
  usersRouter.get('/register', (req, res) => {
    // userRegister
  });

  // // profile page DO LATER!
  // usersRouter.post('/profile', (req, res) => {
    
  // });

  return usersRouter;
};

module.exports = usersRouterWrapper;