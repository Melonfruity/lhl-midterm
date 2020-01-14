const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {

  // renders lobby page
  rootRouter.get('/', (req, res) => {
    const templateVars = {user: req.session ? req.session.userID : null}
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
