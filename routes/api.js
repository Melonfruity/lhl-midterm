const apiRouter = require('express').Router();

const apiRouterWrapped = (db) => {
  
  apiRouter.get('/', (req, res) => {
    // TEST API QUERY

    const queryString = `
      SELECT * FROM name;
    `
    db
      .query(queryString)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json(err.stack));
  });

  return apiRouter;
}

module.exports = apiRouterWrapped;