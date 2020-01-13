const usersRouter = require('express').Router();
const { userLogin, userRegister } = require('../utils/helpers');

const usersRouterWrapper = (db) => {
  const databaseHelper = require('./database')(db);

  // login
  usersRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    // return the user entry if applicable
    databaseHelper.findUserByUsername(username)
      .then((user) => {
        const loggedIn = userLogin(password, user.password);
        if (loggedIn) {
          req.session.userID = user.id;
          res.status(200).json(user);
        } else {
          res.status(400).json({ error: 'unauthenticated' })
        }
      })
      .catch(err => res.status(400).json(err.stack));
  });
  // register page



  // register
  usersRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    databaseHelper.findUserByUsername(username)
      .then(data => {
        if (!data) {
        return databaseHelper.createUser(username, password)
        .then((createdUser => {
          console.log("----->",createdUser)
          req.session.userID = createdUser.id;
          res.status(200).json(createdUser)
        }))
        } else {
          res.status(500).json({ error: "username already taken" });
        }
      })
      .catch(err => console.log(err.stack));

      // OLD
    // db
    //   .query(queryString, queryParams)
    //   .then((data) => {
    //     if (!data.rows[0]) {
    //       // CREATE USER STARTS HERE
    //       const insertString = `
    //         INSERT INTO users (username, password)
    //         VALUES ($1, $2)
    //         RETURNING *;
    //       `
    //       const insertData = [username, userRegister(password)];
    //       db
    //         .query(insertString, insertData)
    //         .then((data) => {
    //           const user = data.rows[0];
    //       // CREATE USER ENDS HERE
    //           req.session.userID = user.id;
    //           res.status(200).json(user)
    //         });
    //     } else {
    //       res.status(500).json({ error: 'username already taken' });
    //     }
    //   })
    //   .catch(err => console.log(err.stack));
  });

  usersRouter.post('/logout', (req, res) => {
    req.session = null;
    res.redirect(301, '/');
  })

  return usersRouter;
};

module.exports = usersRouterWrapper;
