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
  rootRouter.get('/stats', async (req, res) => {
    const gamesWon = await databaseHelper.mostGamesWon()
      .then((gamesWon) => {
        return gamesWon;
      })
      .catch((err) => res.status(400).json(err.stack));
    const gamesPlayed = await databaseHelper.mostGamesPlayed()
      .then((gamesPlayed) => {
        return gamesPlayed;
      })
    const templateVars = { user: req.session ? req.session.userID : null, gamesWon, gamesPlayed }
    res.render('stats', templateVars);
  })

// renders room page
rootRouter.get('/rooms', (req, res) => {
  const templateVars = { user: req.session ? req.session.userID : null }
  res.render('rooms', templateVars);
});

// renders game page
rootRouter.get('/game', (req, res) => {
  res.render('game');
})

return rootRouter;
};



module.exports = rootRouterWrapper;
