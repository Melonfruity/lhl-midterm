const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {

  // renders lobby page
  rootRouter.get('/', (req, res) => {
    res.render('index');
  });

  // renders room page
  rootRouter.get('/room', (req, res) => {
    res.render('room');
  });

  // renders stats page
  rootRouter.get('/stats', (req, res) => {
    res.render('stats');
  });

  return rootRouter;
};

module.exports = rootRouterWrapper;