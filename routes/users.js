const usersRouter = require('express').Router();

const usersRouterWrapper = (db) => {
  return usersRouter;
};

module.exports = usersRouterWrapper;