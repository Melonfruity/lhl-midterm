/* eslint-disable camelcase */
const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {
  
  // Create the first dealer card
  gamesRouter.get('/initiate', async (req, res) => {
    const room_id = req.query.room_id;

    const chkDealerCard = `
    SELECT dealer_card FROM game_states
    WHERE room_id = ${room_id}`

    const check = await db
      .query(chkDealerCard)
      .then(data => data.rows[0])
    
    if (check.dealer_card) {
      res.json(check)
    } else {
      const cardNum = Math.floor(Math.random() * 13) + 1;
      const initDealerCard = `
        UPDATE game_states
        SET card_${cardNum} = 0, dealer_card = '${cardNum}', round_number = round_number + 1
        WHERE room_id = ${room_id}
        RETURNING *;
      `
      await db
        .query(initDealerCard)
        .then(data => res.json({ dealer_card: cardNum }))
    }
    
  });

  // get playerhand
  gamesRouter.get('/hand', async (req, res) => {
    const user_id = req.session.userID;
    const { room_id } = req.query;

    const getGameState = `
      SELECT * FROM game_states
      WHERE game_states.room_id = ${room_id};
    `
    const game_state = await db
      .query(getGameState)
      .then(data => data.rows[0])
    
    const getPlayerHand = `
      SELECT * FROM player_hands
      WHERE game_state_id = ${game_state.id}
      AND player_hands.user_id = ${user_id};
    `
    await db
      .query(getPlayerHand)
      .then(data => res.json(data.rows[0]))

  });

  // update playerhand
  gamesRouter.post('/hand', async (req, res) => {
    const user_id = req.session.userID;
    const { cardNum, room_id } = req.body;

    const getGameState = `
      SELECT * FROM game_states
      WHERE game_states.room_id = ${room_id};
    `
    const game_state = await db
      .query(getGameState)
      .then(data => data.rows[0].id)

    const updateHand = `
      UPDATE player_hands
      SET card_${cardNum} = 0, played_this_round = true, card_played = ${cardNum}
      WHERE user_id = ${user_id}
      AND game_state_id = ${game_state}
      RETURNING *;
    `
    await db
      .query(updateHand)
      .then(data => res.json(data.rows[0]))
  });

  // increment round and send back new dealer card
  // include new score
  gamesRouter.post('/play', async (req, res) => {
    const user_id = req.session.userID;
    const { room_id } = req.body;

    const getGameState = `
      SELECT * FROM game_states
      WHERE game_states.room_id = ${room_id};
    `
    const game_state = await db
      .query(getGameState)
      .then(data => data.rows[0].id);

    const getIfPlayed = `
      SELECT played_this_round FROM player_hands
        WHERE game_state_id = ${game_state}
        AND user_id = ${user_id};
    `
    await db
      .query(getIfPlayed)
      .then(data => {
        const played = data.rows[0];
        res.json(played);
      });

  });

  gamesRouter.get('/updateGame', async (req, res) => {
    const user_id = req.session.userID;
    console.log(user_id)
    const { room_id, dealer_card } = req.query;

    const getGameState = `
      SELECT * FROM game_states
      WHERE game_states.room_id = ${room_id};
    `
    const game_state = await db
      .query(getGameState)
      .then(data => data.rows[0].id);

    // Check that both players played
    const getBothPlayed = `
      SELECT count(*) FROM player_hands
        WHERE game_state_id = ${game_state}
        AND played_this_round = true;
    `
    const bothPlayed = await db
      .query(getBothPlayed)
      .then(data => data.rows[0]);

    if (bothPlayed.count === '2') {

      const usersRoom = `
        SELECT * FROM room_users
        WHERE room_id = ${room_id};
      `
      const usersInRoom = await db
        .query(usersRoom)
        .then(data => data.rows);
    
      const pOne = usersInRoom[0].user_id;
      const pTwo = usersInRoom[1].user_id;

      const updateHand = (user) => `
        UPDATE player_hands
          SET played_this_round = false
          WHERE user_id = ${user}
          AND game_state_id = ${game_state}
          RETURNING card_played;`
      
      const pOneCard = await db
        .query(updateHand(pOne))
        .then(data => data.rows[0]);

      const pTwoCard = await db
        .query(updateHand(pTwo))
        .then(data => data.rows[0]);

      console.log(pOneCard, pTwoCard, dealer_card);
      console.log(typeof pOneCard.card_played)
      // // Scoring
      const pOScore = pOneCard.card_played > pTwoCard.card_played ? Number(dealer_card) : 0;
      const pTScore = pTwoCard.card_played > pOneCard.card_played ? Number(dealer_card) : 0;

      const score = [{user_id: pOne, score: pOScore}, {user_id: pTwo, score: pTScore}]

      const newDealerCard = async () => {
        const cardNum = Math.floor(Math.random() * 13) + 1;
        const chkDealerCard = `
          SELECT * FROM game_states
          WHERE room_id = ${room_id}
          AND card_${cardNum} = 1;
        `
        const check = await db
          .query(chkDealerCard)
          .then(data => data.rows[0])
        if (check) {
          const newDealerCard = `
          UPDATE game_states
          SET card_${cardNum} = 0, dealer_card = '${cardNum}', round_number = round_number + 1
          WHERE room_id = ${room_id}
          RETURNING *;
        `
        // need to get this and send to frontend
        await db
          .query(newDealerCard)
          .then(data => res.json({ dealer_card: cardNum, score, user_id: user_id}))
        } else {
          newDealerCard();
        }
      }
      newDealerCard();
    } else {
      const chkDealerCard = `
        SELECT dealer_card FROM game_states
        WHERE room_id = ${room_id}`

      await db
        .query(chkDealerCard)
        .then(data => {
            res.json(data.rows[0]);
        })
    }

  });

  return gamesRouter;
};

module.exports = gamesRouterWrapped;
