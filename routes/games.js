const gamesRouter = require('express').Router();

const gamesRouterWrapped = (db) => {
  
  // test route
  gamesRouter.get('/', (req, res) => {
    // TEST API QUERY

    const queryString = `
      SELECT * FROM users;
    `
    db
      .query(queryString)
      .then((data) => res.status(200).json(data.rows))
      .catch((err) => res.status(400).json(err.stack));
  });
  
  // game update
  gamesRouter.post('/games/:id', (req, res) => {
    // - Client to server using games id (POST api/games/:id)
    // - If the user id being sent to games is the same as current_player
    //   then update the cards_played table
    // - server queries cards_played table and returns to all clients (players   
    //   or host) cards_played info
    // - If the update results in the game_state to be finished then the
    //   server send the end game page (redirect /end)

  });

  return gamesRouter;
}

module.exports = gamesRouterWrapped;