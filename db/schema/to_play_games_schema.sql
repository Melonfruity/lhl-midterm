DROP TABLE IF EXISTS
  users,
  game_types,
  cards,
  players,
  rooms,
  games
;

/* 1. placeholder users */
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

/* 2. all game types*/
CREATE TABLE game_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL, -- Name of the game
  min_players SMALLINT NOT NULL DEFAULT 2,
  max_players SMALLINT NOT NULL DEFAULT 2
);

/* 3. all cards */
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL, -- king_of_hearts
  type VARCHAR(255) NOT NULL, -- standard_cards
  value VARCHAR(255) NOT NULL, -- 
  img_url VARCHAR(255) DEFAULT NULL -- URL
);

/* 4. can change num of players */
CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  player_one INTEGER REFERENCES users(id) DEFAULT NULL,
  player_two INTEGER REFERENCES users(id) DEFAULT NULL,
  player_three INTEGER REFERENCES users(id) DEFAULT NULL,
  player_four INTEGER REFERENCES users(id) DEFAULT NULL,
  player_five INTEGER REFERENCES users(id) DEFAULT NULL,
  player_six INTEGER REFERENCES users(id) DEFAULT NULL,
  player_seven INTEGER REFERENCES users(id) DEFAULT NULL
);

/* 5. rooms */
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  players_id INTEGER REFERENCES players(id) ON DELETE CASCADE, -- table which hold all players in the game
  game_type INTEGER REFERENCES game_types(id) -- which game is being played
);

/* 6. active game */
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  current_player_id INTEGER REFERENCES users(id), -- turn tracker
  game_state VARCHAR(255), -- game state tracker
  game_winner_id INTEGER REFERENCES users(id)
);