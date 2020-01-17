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

  // game_states update
  dbRouter.get('/:id', (req, res) => {
    const room_id = req.params.id;

    // check the round number 
    const queryString = `
      SELECT player_hands.played_this_round FROM player_hands
      JOIN game_states ON player_hands.game_state_id = game_states.id
      WHERE game_states.room_id = ${room_id};
    `
    db
      .query(queryString)
      .then(data => {
        const pOPlayed = data.rows[0] ? data.rows[0].played_this_round : false;
        const pTPlayed = data.rows[1] ? data.rows[1].played_this_round : false;
      
        res.status(200).json({ nextRound: pOPlayed && pTPlayed });
      })
  })

  return dbRouter;
}
    
module.exports = dbRouterWrapper;