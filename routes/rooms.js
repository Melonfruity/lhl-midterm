/* eslint-disable camelcase */
const roomsRouter = require('express').Router();

const roomsRouterWrapper = (db) => {
  const databaseHelper = require('../utils/database')(db);

  // create a new room
  roomsRouter.post('/', (req, res) => {
    const user_id = req.session.userID;
    const { game_id } = req.body;

    if (!user_id) {
      res.json({ error: 'not logged in or playing as guest' });
    } else {
      const queryNewRoom = `
        INSERT INTO rooms (name, host_ID, game_id, game_started)
          VALUES ('why is there a name?', $1, $2, false)
          RETURNING *;
        `;

      const queryNewRoomParams = [user_id, game_id];

      db
        .query(queryNewRoom, queryNewRoomParams)
        .then((rooms) => rooms.rows[0])
        .then((room) => {

          const queryNewRoomUsers = `
          INSERT INTO room_users (room_id, user_id)
            VALUES ($1, $2)
            RETURNING *;
          `;
          const queryNewRoomUsersParams = [room.id, user_id];

          db
            .query(queryNewRoomUsers, queryNewRoomUsersParams)
            .then((roomUsers) => roomUsers.rows)
            .catch((err) => console.log(err.stack));

          const queryNewGameState = `
            INSERT INTO game_states (room_id)
              VALUES ($1)
              RETURNING *;
            `;
          const queryNewGameStateParams = [room.id];

          db
            .query(queryNewGameState, queryNewGameStateParams)
            .then((gameState) => {
              const gameStateId = gameState.rows[0].id;
              console.log('gamestate rows', gameState.rows[0].id);

              const queryNewPlayerHand = `
                INSERT INTO player_hands (game_state_id, user_id)
                VALUES ($1, $2)
                RETURNING *;
                `;
              const queryNewPlayerHandParams = [gameStateId, user_id];
              db
                .query(queryNewPlayerHand, queryNewPlayerHandParams)
                .then((playerHand) => console.log(playerHand.rows));
            });
          res.json({ room_id: room.id });
        })
        .catch((err) => res.status(400).json(err.stack));
    }
  });

  roomsRouter.get('/:id', (req, res) => {
    const user_id = req.session.userID;
    const room_id = req.params.id;

    const queryCheckIfUserInRoom = `
      SELECT COUNT(room_users.*)
        FROM room_users
        WHERE room_id = ${room_id}
        AND user_id = ${user_id};
      `;

    db
      .query(queryCheckIfUserInRoom)
      .then((data) => {
        console.log(data.rows[0].count);
        if (data.rows[0].count === '1') {
          console.log('if statement')
          const templateVars = {
            user: req.session ? req.session.userID : null,
          };
          res.render('game', templateVars);
        } else if (data.rows[0].count === '0') {

          console.log('else statement');
          const getGameState = `
        SELECT game_states.id 
        FROM game_states
        WHERE room_id = ${room_id}
        `
          db.query(getGameState)
            .then((data) => {
              const game_state_id = data.rows[0].id

              console.log('gamestate', game_state_id)


              const query = `
          BEGIN;
          INSERT INTO room_users (user_id, room_id)
          VALUES (${user_id}, ${room_id} );
          
          INSERT INTO player_hands (user_id, game_state_id)
          values (${user_id}, ${game_state_id} );
          
          COMMIT;`

              db
                .query(query)
                .then((data) => {
                  res.json({ room_id: room_id });
                })
                .catch((err) => console.log(err.stack));

            })
            .catch((err) => console.log(err.stack));
        }


        //   if (data.rows[0].count === 0) {
        //     if (!user_id) {
        //       res.json({ error: 'not logged in or playing as guest' });
        //     } else {


        //       const queryNewRoomUsers = `
        //       INSERT INTO room_users (room_id, user_id)
        //         VALUES ($1, $2)
        //         RETURNING *;
        //     `;
        //       const queryNewRoomUsersParams = [room_id, user_id];

        //       db
        //         .query(queryNewRoomUsers, queryNewRoomUsersParams)
        //         .then((roomUsers) => roomUsers.rows);


        //       const getGameState = `
        // SELECT game_states.id 
        // FROM game_states
        // WHERE room_id = ${room_id}
        // `
        //       db.query(getGameState)
        //         .then((data) => {
        //           const game_state_id = data.rows[0].id

        //           const queryNewPlayerHand = `
        //   INSERT INTO player_hands (game_state_id, user_id)
        //   VALUES ($1, $2)
        //   RETURNING *;
        //   `;
        //           const queryNewPlayerHandParams = [game_state_id, user_id];
        //           db
        //             .query(queryNewPlayerHand, queryNewPlayerHandParams)
        //             .then((playerHand) => playerHand.rows);
      }).catch((err) => console.log(err.stack));
    // }
    //res.json({ room_id: room_id });



    //   }
    //   else {
    //     res.send('user already exist');
    //   }
    // })

    // res.render('game', templateVars);
    console.log('here');
  });



//helakkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

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
