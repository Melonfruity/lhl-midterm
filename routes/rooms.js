const roomsRouter = require('express').Router();

const roomsRouterWrapper = (db) => {

  // get a specific room entry
  roomsRouter.get('/', (req, res) => {
    const { player_id, game_id } = req.body;

    // change as necessary
    const queryString = `
      SELECT * FROM game_states;
    `
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });

  // create a new room
  roomsRouter.post('/', (req, res) => {
    const { player_id, game_id } = req.body;

    // change as necessary
    const queryString = `
      SELECT * FROM game_states;
    `

    // create room entry then game_state entry
    // return a room_id and game_state_id
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

  // get all rooms
  roomsRouter.get('/all', (req, res) => {
    // change as necessary
    const queryString = `
      SELECT * FROM game_states;
    `

    // return all rooms
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));

  });

  return roomsRouter;
};

module.exports = roomsRouterWrapper;
