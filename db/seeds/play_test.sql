-- DEFAULT USERS
INSERT INTO users (username, password) VALUES ('playerone', 'unhashedpass');
INSERT INTO users (username, password) VALUES ('playertwo', 'unhashedpass');

INSERT INTO rooms (name, game_started) VALUES ('room1', true);
INSERT INTO game_states (card_1, room_id) VALUES (1, 1);
INSERT INTO player_hands (game_state_id, user_id) VALUES (1, 1);
INSERT INTO player_hands (game_state_id, user_id) VALUES (1, 2);
