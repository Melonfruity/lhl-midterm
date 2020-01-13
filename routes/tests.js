const testsRouter = require('express').Router();

const testsRouterWrapped = (db) => {
  
  testsRouter.get('/', (req, res) => {
    const queryString = `
      SELECT * FROM users;
    `
    db
      .query(queryString)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json(err.stack));  
  });

  testsRouter.post('/', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
    const queryString = `
      INSERT 
        INTO users (username, password)
        VALUES ($1, $2)
      RETURNING *;
    `
    db
      .query(queryString, [username, password])
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json(err.stack));
  });
  

  return testsRouter;
}

module.exports = testsRouterWrapped;