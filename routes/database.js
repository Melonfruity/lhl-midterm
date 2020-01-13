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

  return {
      findUserByUsername,
      createUser
    }
  }
