const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {
  const databaseHelper = require('../utils/database')(db);

  // renders lobby page
  rootRouter.get('/', (req, res) => {
    databaseHelper.getAllGames()
      .then((gamesData) => {
        const templateVars = {
          user: req.session ? req.session.userID : null,
          gamesData
        }
        res.render('index', templateVars);
      })
      .catch((err) => res.status(400).json(err.stack));
  });

  // renders profile page
  rootRouter.get('/profile', async (req, res) => {
    const user_id = req.session.userID;
    const userDetail = await databaseHelper.getUserDetailsWithId(user_id);
    const gameDetail = await databaseHelper.getGamesWonWithUserId(user_id)
    .then(res => {
      return res;
    })
    .catch((err) => {return 0});
    const gamesPlayed = await databaseHelper.getGamesPlayedWithId(user_id)
    .then(res => res)
    .catch((err) => {return 0});

    res.json({user_id, userDetail, gameDetail, gamesPlayed});
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
      .catch((err) => res.status(400).json(err.stack));
      const winRate = await databaseHelper.highestWinRatio()
      .then((winRate) => {
        return winRate;
      })
    const templateVars = { user: req.session ? req.session.userID : null, gamesWon, gamesPlayed, winRate }
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
