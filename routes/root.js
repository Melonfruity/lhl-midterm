const rootRouter = require('express').Router();

const rootRouterWrapper = (db) => {
  
  // render landing page
  rootRouter.get('/', (req, res) => {
    res.render('index');
  });

  // renders lobby page
  rootRouter.get('/lobby', (req, res) => {
    
  });

  // // renders stats page
  // rootRouter.get('/stats', (req, res) => {
    
  // });

  return rootRouter;
};

module.exports = rootRouterWrapper;