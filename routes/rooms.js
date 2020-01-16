const roomsRouter = require('express').Router();

const roomsRouterWrapper = (db) => {
  const databaseHelper = require('../utils/database')(db);

  // create a new room
  roomsRouter.post('/', (req, res) => {
    const user_id = req.session.userID
    const { game_id } = req.body;

    if (!user_id) {
      res.json({ error: 'not logged in or playing as guest' })
    } else {
      const queryNewRoom = `
        INSERT INTO rooms (name, host_ID, game_id, game_started)
          VALUES ('why is there a name?', $1, $2, false)
          RETURNING *;
        `

      const queryNewRoomParams = [user_id, game_id];

      db
        .query(queryNewRoom, queryNewRoomParams)
        .then((rooms) => rooms.rows[0])
        .then((room) => {

          const queryNewRoomUsers = `
            INSERT INTO room_users (room_id, user_id)
              VALUES ($1, $2)
              RETURNING *;
          `
          const queryNewRoomUsersParams = [room.id, room.host_id];

          db
            .query(queryNewRoomUsers, queryNewRoomUsersParams)
            .then((roomUsers) => console.log(roomUsers.rows))

          const queryNewGameState = `
            INSERT INTO game_states (room_id)
              VALUES ($1)
              RETURNING *;
          `
          const queryNewGameStateParams = [room.id];

          db
            .query(queryNewGameState, queryNewGameStateParams)
            .then((gameState) => {
              const queryNewPlayerHand = `
                INSERT INTO player_hands (game_state_id, user_id)
                  VALUES ($1, $2)
                  RETURNING *;
              `
              const queryNewPlayerHandParams = [gameState.id, user_id];
              db
                .query(queryNewPlayerHand, queryNewPlayerHandParams)
                .then((playerHand) => console.log(playerHand.rows))
            })
          res.json({ room_id: room.id });
        })
        .catch((err) => res.status(400).json(err.stack));
    }
  });

  roomsRouter.get('/:id', (req, res) => {
    const templateVars = { user: req.session ? req.session.userID : null };
    res.render('game', templateVars);
  })



  // change this to games
  // console.log(req.params)
  // databaseHelper.getAllGames()
  //   .then((gamesData) => {
  //     const templateVars = {
  //       user: req.session ? req.session.userID : null,
  //       gamesData
  //     };
  //     console.log(gamesData);
  //     res.render('index', templateVars);
  //   })
  //   .catch((err) => res.status(400).json(err.stack));
  //});

  return roomsRouter;
};

module.exports = roomsRouterWrapper;
