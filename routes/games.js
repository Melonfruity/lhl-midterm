const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {

  // Have frontend pass player_id and game_id
  
  // game_states update
  gamesRouter.post('/state', (req, res) => {
    const { room_id, playedCard } = req.body;
    
    // make a call to dealer

    const queryString = `
      UPDATE game_states
      SET card_${playedCard} = 0
      WHERE room_id = ${room_id}
      RETURNING *;
    `;

    // update the game_state entry
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

  // game_states get
  gamesRouter.get('/state', (req, res) => {
    const { room_id } = req.body;

    // change as necessary
    const queryString = `
      SELECT * FROM game_states
      WHERE room_id = ${room_id};
    `;
    // return the game_state
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });

  // player_hand update
  gamesRouter.post('/hand', (req, res) => {
    const { user_id, pickedCard } = req.body;    // change as necessary
    const queryString = `
      UPDATE player_hands
      SET card_${pickedCard} = 0
      WHERE user_id = ${user_id}
      RETURNING *;

    `;
    db
      .query(queryString)
      .then((data) => {res.status(200).send(data.rows)})
      .catch((err) => res.status(400).json(err.stack));
  });
  

    // player_hand get
  gamesRouter.get('/hand', (req, res) => {
    const { user_id } = req.body;

    // change as necessary
    const queryString = `
      SELECT * FROM player_hands
      WHERE user_id = ${user_id};
    `
    // update players hand
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });
  

  return gamesRouter;
}

module.exports = gamesRouterWrapped;
