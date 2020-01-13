const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {

  // Have frontend pass player_id and game_id
  
  // game_states update
  gamesRouter.post('/state', (req, res) => {
    const { player_id, game_id } = req;
    
    // make a call to dealer

    const queryString = `
      SELECT * FROM game_states;
    `

    // update the game_state entry
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

  // game_states get
  gamesRouter.get('/state', (req, res) => {
    const { player_id, game_id } = req;

    // change as necessary
    const queryString = `
      SELECT * FROM game_states;
    `
    // return the game_state
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

  // player_hand update
  gamesRouter.post('/hand', (req, res) => {
    const { player_id, game_id } = req;

    // change as necessary
    const queryString = `
      SELECT * FROM game_states;
    `
    // update players hand
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

    // player_hand get
  gamesRouter.get('/hand', (req, res) => {
    const { player_id, game_id } = req;

    // change as necessary
    const queryString = `
      SELECT * FROM game_states;
    `
    // return players hand
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

  return gamesRouter;
}

module.exports = gamesRouterWrapped;