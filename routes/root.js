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
    const userData = await databaseHelper.getUserDetailsWithId(req.session.userID) // temporary, pull actual user id from cookie
      .then((userData) => {
        return userData;
      })
      .catch((err) => res.status(400).json(err.stack));
    const gameData = await databaseHelper.getGamesWonWithUserId(req.session.userID) // temporary, pull actual user id from cookie
      .then((gameData) => {
        return gameData;
      })
    const templateVars = { user: req.session ? req.session.userID : null, userData, gameData }
    res.render('profile', templateVars);
  });

  // renders stats page
  rootRouter.get('/stats', (req, res) => {
    databaseHelper.mostGamesWon()
    .then((statsData) => {
      const templateVars = { user: req.session ? req.session.userID : null, statsData}
      res.render('stats', templateVars);
    })
    .catch((err) => res.status(400).json(err.stack));
  });

  // renders room page
  rootRouter.get('/rooms', (req, res) => {
    const templateVars = { user: req.session ? req.session.userID : null }
    res.render('rooms', templateVars);
  });

  rootRouter.get('/game', (req, res) => {
    res.render('game');
  })

  rootRouter.post('/game', (req, res) => {
    res.render('game');
  })

  return rootRouter;
};



module.exports = rootRouterWrapper;
