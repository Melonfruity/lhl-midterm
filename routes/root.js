const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {
  const databaseHelper = require('../utils/database')(db);

  // renders lobby page
  let gamesData = {}
  rootRouter.get('/', (req, res) => {
    databaseHelper.getAllGames()
    .then((data) => {
      gamesData = data;
      console.log("GAMES DATA", gamesData)
    })
    .catch(err => console.log("Error: ", err))
    const templateVars = {user: req.session ? req.session.userID : null, gamesData}
    res.render('index', templateVars);
  });

  // renders room page
  rootRouter.get('/room', (req, res) => {
    res.render('room');
  });

  // renders stats page
  rootRouter.get('/stats', (req, res) => {
    const templateVars = {user: req.session ? req.session.userID: null}
    res.render('stats', templateVars);
  });

  rootRouter.get('/rooms', (req, res) => {
    const templateVars = {user: req.session ? req.session.userID: null}
    res.render('rooms', templateVars);
  });

  return rootRouter;
};

module.exports = rootRouterWrapper;
