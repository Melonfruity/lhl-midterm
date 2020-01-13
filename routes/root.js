const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {

  // renders lobby page
  rootRouter.get('/', (req, res) => {
    console.log("SESSIONS", req.session)
    const templateVars = {user: req.session ? req.session.userID : null}
    res.render('index', templateVars);
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
