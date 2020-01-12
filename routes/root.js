const rootRouter = require('express').Router();
  
rootRouter.get('/', (req, res) => {

  res.render('index');
});

module.exports = rootRouter;