const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {

  // renders lobby page
  rootRouter.get('/', (req, res) => {
    res.render('index');
  });

  // renders stats page
  rootRouter.get('/stats', (req, res) => {
    res.render('stats');
  });

  rootRouter.get('/rooms', (req, res) => {
    res.render('rooms');
  });

  rootRouter.get('/game', (req, res) => {
    res.render('game');
  })



  return rootRouter;
};



module.exports = rootRouterWrapper;
