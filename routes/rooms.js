const roomsRouter = require('express').Router();

const roomsRouterWrapper = (db) => {

  // get all rooms with id
  roomsRouter.get('/all', (req, res) => {
    // change as necessary
    const { game_id } = req.query;
    console.log(game_id)

    const queryParams = [game_id];
    
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

  roomsRouter.get('/:id', (req, res) => {
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

  return roomsRouter;
};

module.exports = roomsRouterWrapper;
