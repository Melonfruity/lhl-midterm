const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {
  const databaseHelper = require('../utils/database')(db);

  // renders lobby page
  rootRouter.get('/', (req, res) => {
    databaseHelper.getAllGames()
      .then((gamesData) => {
        const templateVars = { user: req.session ? req.session.userID : null, gamesData }
        res.render('index', templateVars);
      })
      .catch((err) => res.status(400).json(err.stack));
  });

  // renders profile page
  rootRouter.get('/profile', async (req, res) => {
    const userData = await databaseHelper.getUserDetailsWithId(1) // temporary, pull actual user id from cookie
      .then((userData) => {
        console.log("USERDATA", userData)
        return userData;
      })
      .catch((err) => res.status(400).json(err.stack));
    const gameData = await databaseHelper.getGamesWonWithUserId(1) // temporary, pull actual user id from cookie
      .then((gameData) => {
        console.log("GAMEDATA", gameData)
        return gameData;
      })
    const templateVars = { user: req.session ? req.session.userID : null, userData, gameData }
    res.render('profile', templateVars);
  });

  // renders stats page
  rootRouter.get('/stats', (req, res) => {
    const templateVars = { user: req.session ? req.session.userID : null }
    res.render('stats', templateVars);
  });

  // renders room page
  rootRouter.get('/rooms', (req, res) => {
    const templateVars = { user: req.session ? req.session.userID : null }
    res.render('rooms', templateVars);
  });

  return rootRouter;
};

module.exports = rootRouterWrapper;
