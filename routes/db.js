const dbRouter = require('express').Router();

const dbRouterWrapper = (db) => {

  dbRouter.get('/all', (req, res) => {
    // change as necessary
    const { game_id } = req.query;
    const queryParams = [game_id];
    console.log(game_id)
    const queryString = `
      SELECT * FROM rooms
      WHERE rooms.game_id = $1;
    `
    db
      .query(queryString, queryParams)
      .then((data) => {
        console.log(data.rows)
        res.status(200).json(data.rows)})
      .catch((err) => res.status(400).json(err.stack));

  });

  return dbRouter;
}

module.exports = dbRouterWrapper;