

const dbParams = require('../utils/dbParams');
const { Pool } = require('pg');
const db = new Pool(dbParams);

const dealerCard = function(game_state_id, res) {
  let cardNum = Math.floor(Math.random() * 13 + 1);
  const queryString2 = `
    SELECT card_${cardNum}
    FROM game_states
    WHERE game_states.id = ${game_state_id};`
  db
    .query(queryString2)
    .then((data) => {
      let card = data.rows[0];
      for (let property in card) {
        if (card[property] > 0) {
          const queryString3 = `UPDATE game_states
          SET dealer_card = ${cardNum}
          WHERE game_states.id = ${game_state_id}`;
          db
            .query(queryString3)
            .then(res.json({ cardValue: cardNum }));
        }
        if (card[property] === 0) {
          dealerCard(game_state_id, res);
        }
      }
    })
}


const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {

  // Have frontend pass player_id and game_id

  //check if everyone went
  gamesRouter.post('/round', (req, res) => {
    const { game_state_id } = req.body;
    let output = { winner: null };

    const queryString1 = `SELECT played_this_round
      FROM player_hands
      JOIN game_states ON game_state_id = game_states.id
      where game_states.id = ${game_state_id}`;
    const queryString2 = `SELECT user_id, card_played
      FROM player_hands
      WHERE game_state_id = ${game_state_id}
      AND card_played = (SELECT max(card_played)
      FROM player_hands)`;

    db
      .query(queryString1)
      .then((data) => {
        for (let user of data.rows) {
          if (!user.played_this_round) {
            return false;
          }
        }
        return true;
      })
      .then((finished) => {

        if (finished) {

          db
            .query(queryString2)
            .then((data) => {
              if (data.rows.length > 1) { //if there is a tie
                output.winner = 'tie';
                output.score = 0;
                res.json(output);
              } else {
                output.winner = data.rows[0].user_id;

                const queryString3 = `SELECT dealer_card
              FROM game_states
              WHERE game_states.id = ${game_state_id};`;
                db
                  .query(queryString3)
                  .then((data) => {
                    output.roundScore = data.rows[0].dealer_card;
                    //console.log(output.score, output.winner);
                    const queryString4 = `UPDATE player_hands
                    SET score = score + ${output.roundScore}
                    WHERE user_id = ${output.winner}
                    RETURNING score;`;
                    db
                      .query(queryString4)
                      .then((data) => {

                        output.score = data.rows[0].score;
                        // const incrementRound = `
                        // UPDATE game_states
                        // SET round_number = round_number + 1
                        // WHERE game_states.id = ${game_state_id}
                        // RETURNING round_number
                        // `;

                        // db
                        //   .query(incrementRound)
                        //   .then((data) => {
                        //     output.round_number = data.rows[0].round_number
                        console.log("OUTPUT = ", output)
                        res.json(output);
                      })
                    // })

                  })
              }

            });
        }
        if (!finished) {
          res.json(output);
        }
      });
  })


  // game_states update
  gamesRouter.post('/state', (req, res) => {
    const { room_id, playedCard } = req.body;

    // make a call to dealer

    const queryString = `UPDATE game_states
      SET card_${playedCard} = 0
      WHERE room_id = ${room_id}
      RETURNING *;`;

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
    const queryString = `SELECT * FROM game_states
      WHERE room_id = ${room_id};`;
    // return the game_state
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });

  // player_hand update
  gamesRouter.post('/hand', (req, res) => {

    const { user_id, pickedCard } = req.body;
    console.log("PICKED CARD", pickedCard)
    let output = {};   // change as necessary
    output[user_id] = pickedCard;
    const queryString1 = `UPDATE player_hands
      SET card_${pickedCard} = 0
          ,played_this_round = true
          ,card_played = ${pickedCard}
      WHERE user_id = ${user_id}
      RETURNING *;`;
    db
      .query(queryString1)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });


  // player_hand get
  gamesRouter.get('/hand', (req, res) => {
    const user_id = req.query.user_id;
    const game_state_id = req.query.game_state_id;

    // change as necessary
    const queryString = `SELECT suit, card_1, card_2, card_3, card_4, card_5, card_6, card_7, card_8, card_9, card_10, card_11, card_12, card_13 FROM player_hands
      WHERE user_id = ${user_id}
      AND game_state_id = ${game_state_id};`
    // update players hand
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows[0]))
      .catch((err) => res.status(400).json(err.stack));
  });

  gamesRouter.post('/start', (req, res) => {
    const { game_state_id } = req.body;
    const queryString1 = `BEGIN;

    UPDATE player_hands
    SET played_this_round = false,
        card_played = null
    WHERE game_state_id = ${game_state_id};

    UPDATE game_states
    SET round_number = round_number +1
    WHERE game_states.id = ${game_state_id};

    COMMIT;`

    db
      .query(queryString1)
      .then(console.log("DEALER CARD = ", dealerCard(game_state_id, res)))

  });


  return gamesRouter;
}

module.exports = gamesRouterWrapped;
