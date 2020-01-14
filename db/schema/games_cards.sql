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