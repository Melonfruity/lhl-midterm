const dbRouter = require('express').Router();

const dbRouterWrapper = (db) => {

  dbRouter.get('/all', (req, res) => {
    // change as necessary
    const { game_id } = req.query;
    const queryParams = [game_id];
    const queryString = `
      SELECT rooms.id as room_id, count(*), rooms.game_started as game_started 
        FROM rooms
        JOIN room_users ON room_users.room_id = rooms.id 
        WHERE rooms.game_id = $1 
        GROUP BY rooms.id;
    `
    db
      .query(queryString, queryParams)
      .then((data) => {
        res.status(200).json(data.rows)})
      .catch((err) => res.status(400).json(err.stack));

  });

  return dbRouter;
}

module.exports = dbRouterWrapper;