const apiRouter = require('express').Router();

const apiRouterWrapped = (db) => {
  
  apiRouter.get('/', (req, res) => {
    // A query
    db.query('SELECT * FROM names;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      db.end();
    });
    res.render('index');
  });

  return apiRouter;
}

module.exports = apiRouterWrapped;