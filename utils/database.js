module.exports = (db) => {

  const findUserByUsername = (username) => {
    const queryString = `
    SELECT * FROM users
    WHERE username = $1;
    `
    // return the user entry if applicable
    return db.query(queryString, [username])
      .then((data) => {
        const user = data.rows[0];
        return user;
      })
  }

  const createUser = (username, password) => {
    const insertString = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
  `;
    const insertData = [username, password];
    return db
      .query(insertString, insertData)
      .then((data) => {
        return data.rows[0]
      })
  }

  const getAllGames = () => {
    const queryString = `SELECT * FROM games`;
    return db.query(queryString)
      .then(res => res.rows[0])
      .catch(err => console.log(err))
  }

  const getUserDetailsWithId = (id) => {
    const queryString = `SELECT username, COUNT(*) as games_played, TO_CHAR(player_since :: DATE, 'Mon dd, yyyy') AS player_since
    FROM users
    JOIN game_history_users ON users.id = game_history_users.user_id
    WHERE id = $1
    GROUP BY username, users.player_since;`
    return db.query(queryString, [id])
      .then((data) => {
        return data.rows[0];
      })
  }

  const getGamesWonWithUserId = (id) => {
    const queryString = `SELECT users.id, COUNT(winner) AS games_won
    FROM users
    JOIN game_history_users ON users.id = user_id
    Join game_histories ON game_history_id = game_histories.id
    WHERE users.id = $1
    GROUP BY users.id;`
    return db.query(queryString, [id])
      .then((data) => {
        return data.rows[0];
      })
  }

  const mostGamesWon = () => {
    const queryString = `SELECT game_histories.winner AS user_id, users.username, COUNT(winner) AS games_won
    FROM game_histories
    JOIN game_history_users ON game_history_users.game_history_id = game_histories.id
    JOIN users ON users.id = game_histories.winner
    GROUP BY winner, users.username
    ORDER BY COUNT(winner) DESC;`
    return db.query(queryString)
      .then((data) => {
        return data.rows;
      })
  }

  const mostGamesPlayed = () => {
    const queryString = `SELECT users.id, users.username, COUNT(game_history_users.user_id) AS games_played
    FROM game_history_users
    JOIN users ON game_history_users.user_id = users.id
    GROUP BY users.username, users.id
    ORDER BY games_played DESC;`
    return db.query(queryString)
      .then((data) => {
        return data.rows;
      })
  }

  return {
    findUserByUsername,
    createUser,
    getAllGames,
    getUserDetailsWithId,
    getGamesWonWithUserId,
    mostGamesWon,
    mostGamesPlayed
  }
}
