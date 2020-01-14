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

  return {
    findUserByUsername,
    createUser,
    getAllGames,
    getUserDetailsWithId,
    getGamesWonWithUserId
  }
}
