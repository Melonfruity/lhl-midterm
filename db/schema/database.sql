DROP TABLE IF EXISTS game_history_users;
DROP TABLE IF EXISTS game_histories;
DROP TABLE IF EXISTS player_hands;
DROP TABLE IF EXISTS game_states;
DROP TABLE IF EXISTS room_users;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL, -- king_of_hearts
  type VARCHAR(255) NOT NULL, -- standard_cards
  value VARCHAR(255) NOT NULL, -- 
  img_url VARCHAR(255) -- URL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255),
  tokens INTEGER,
  is_guest BOOLEAN
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  tutorial TEXT,
  card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
  min_players SMALLINT,
  max_players SMALLINT
);

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  host_ID INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  game_started BOOLEAN
);

CREATE TABLE room_users (
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(room_id, user_id)
);


CREATE TABLE game_histories (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  winner INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE game_history_users (
  game_history_id INTEGER REFERENCES game_histories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY(game_history_id, user_id)
);

-- CARDS IN DECK
CREATE TABLE game_states (
  id serial PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES  games(id) ON DELETE CASCADE,
  card_1 SMALLINT,
  card_2 SMALLINT,
  card_3 SMALLINT,
  card_4 SMALLINT,
  card_5 SMALLINT,
  card_6 SMALLINT,
  card_7 SMALLINT,
  card_8 SMALLINT,
  card_9 SMALLINT,
  card_10 SMALLINT,
  card_11 SMALLINT,
  card_12 SMALLINT,
  card_13 SMALLINT,
  round_number SMALLINT
);

CREATE TABLE player_hands (
  id SERIAL PRIMARY KEY,
  game_state_id INTEGER REFERENCES game_states(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  suit SMALLINT,
  score SMALLINT,
  card_1 SMALLINT,
  card_2 SMALLINT,
  card_3 SMALLINT,
  card_4 SMALLINT,
  card_5 SMALLINT,
  card_6 SMALLINT,
  card_7 SMALLINT,
  card_8 SMALLINT,
  card_9 SMALLINT,
  card_10 SMALLINT,
  card_11 SMALLINT,
  card_12 SMALLINT,
  card_13 SMALLINT
);
