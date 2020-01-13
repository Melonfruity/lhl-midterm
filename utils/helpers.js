const bcrypt = require('bcrypt');
const saltRounds = 10;

// checks if password is good
const userLogin = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword); 
};

// returns a hashed password
const userRegister = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

module.exports = {
  userLogin,
  userRegister,
};
