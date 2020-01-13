const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {

  // renders lobby page
  rootRouter.get('/lobby', (req, res) => {
    res.render('index');
  });

  // renders stats page
  rootRouter.get('/stats', (req, res) => {
    res.render('stats');
  });

  return rootRouter;
};

module.exports = rootRouterWrapper;