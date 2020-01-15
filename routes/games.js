
let output = {};

const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {

  // Have frontend pass player_id and game_id

  //check if everyone went 
  gamesRouter.post('/round', (req, res) => {
    const { game_state_id, playedCard } = req.body;
    console.log(game_state_id)
    const roundFinished = false;
    const queryString1 = `
      SELECT played_this_round
      FROM player_hands 
      JOIN game_states ON game_state_id = game_states.id
      where game_states.id = ${game_state_id}
      `;
    const queryString2 = `
      SELECT user_id, MAX()
      `
    db
      .query(queryString1)
      .then((data) => {
        for (let user of data.rows) {
          if (user.played_this_round) {
            break;
          }
        }
        if (roundFinished) {
          db
            .query()
        }
        res.json({ "roundFinished": 'false' });
      });
  });

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
    output[user_id] = pickedCard;
    const queryString1 = `
      BEGIN;

      UPDATE player_hands
      SET card_${pickedCard} = 0
          ,played_this_round = true
      WHERE user_id = ${user_id}
      RETURNING *;

      UPDATE last_played_cards
      SET card = ${playedCard}
      WHERE last_played_cards.id 

    `;
    db
      .query(queryString1)
      .then((data) => res.status(200).send(data.rows))
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
