const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {
  
  // test route
  gamesRouter.get('/', (req, res) => {
    // TEST API QUERY

    const queryString = `
      SELECT * FROM users;
    `
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });
  
  // game update
  gamesRouter.post('/games/:id', (req, res) => {

  });

  // game update
  gamesRouter.get('/games/:id', (req, res) => {

  });

  return gamesRouter;
}

module.exports = gamesRouterWrapped;