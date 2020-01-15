DROP TABLE IF EXISTS game_history_users;
DROP TABLE IF EXISTS game_histories;
DROP TABLE IF EXISTS player_hands;
DROP TABLE IF EXISTS game_states;
DROP TABLE IF EXISTS room_users;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

/* 1. cards in a deck of cards */
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL, -- king_of_hearts
  type VARCHAR(255) NOT NULL, -- standard_cards
  value VARCHAR(255) NOT NULL, --
  img_url VARCHAR(255) -- URL
);

/* 2. users table */
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  tokens INTEGER,
  player_since DATE NOT NULL DEFAULT CURRENT_DATE,
  is_guest BOOLEAN
);

/* 3. game types and descriptions */
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  tutorial TEXT,
  card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
  min_players SMALLINT,
  max_players SMALLINT
);

/* 4. room info */
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  host_ID INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  game_started BOOLEAN
);

/* 5. join table between rooms and users */
CREATE TABLE room_users (
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(room_id, user_id)
);

/* 6. past game data to track rankings */
CREATE TABLE game_histories (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  winner INTEGER REFERENCES users(id) ON DELETE CASCADE
);

/* 7. join table between game history and users */
CREATE TABLE game_history_users (
  game_history_id INTEGER REFERENCES game_histories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(game_history_id, user_id)
);

/* 8. what the dealer currently has in their hand */
CREATE TABLE game_states (
  id serial PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  card_1 SMALLINT DEFAULT 1,
  card_2 SMALLINT DEFAULT 1,
  card_3 SMALLINT DEFAULT 1,
  card_4 SMALLINT DEFAULT 1,
  card_5 SMALLINT DEFAULT 1,
  card_6 SMALLINT DEFAULT 1,
  card_7 SMALLINT DEFAULT 1,
  card_8 SMALLINT DEFAULT 1,
  card_9 SMALLINT DEFAULT 1,
  card_10 SMALLINT DEFAULT 1,
  card_11 SMALLINT DEFAULT 1,
  card_12 SMALLINT DEFAULT 1,
  card_13 SMALLINT DEFAULT 1,
  round_number SMALLINT DEFAULT 1
);


/* 9. what a player currently has in their hand */
CREATE TABLE player_hands (
  id SERIAL PRIMARY KEY,
  game_state_id INTEGER REFERENCES game_states(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  suit SMALLINT DEFAULT 0,
  score SMALLINT DEFAULT 1,
  card_1 SMALLINT DEFAULT 1,
  card_2 SMALLINT DEFAULT 1,
  card_3 SMALLINT DEFAULT 1,
  card_4 SMALLINT DEFAULT 1,
  card_5 SMALLINT DEFAULT 1,
  card_6 SMALLINT DEFAULT 1,
  card_7 SMALLINT DEFAULT 1,
  card_8 SMALLINT DEFAULT 1,
  card_9 SMALLINT DEFAULT 1,
  card_10 SMALLINT DEFAULT 1,
  card_11 SMALLINT DEFAULT 1,
  card_12 SMALLINT DEFAULT 1,
  card_13 SMALLINT DEFAULT 1, 
  played_this_round BOOLEAN DEFAULT false
);

CREATE TABLE last_played_cards (
  id SERIAL PRIMARY KEY,
  player_hands INTEGER REFERENCES player_hands(id) ON DELETE CASCADE,
  game_states_id INTEGER REFERENCES game_states(id) ON DELETE CASCADE,
  card SMALLINT 
);
