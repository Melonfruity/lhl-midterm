-- DEFAULT USERS
INSERT INTO users (username, password) VALUES ('playerone', 'unhashedpass');
INSERT INTO users (username, password) VALUES ('playertwo', 'unhashedpass');

INSERT INTO rooms (name, game_started) VALUES ('room1', true);
INSERT INTO game_states (card_1) VALUES (1);
INSERT INTO player_hands (suit, game_state_id, user_id) VALUES ('H', 1, 1);
INSERT INTO player_hands (suit, game_state_id, user_id) VALUES ('S', 1, 2);
