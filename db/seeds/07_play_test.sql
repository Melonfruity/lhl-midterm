-- DEFAULT USERS
INSERT INTO users (username, password) VALUES ('playerone', 'unhashedpass');
INSERT INTO users (username, password) VALUES ('playertwo', 'unhashedpass');

INSERT INTO game_states (card_1) VALUES (1);
INSERT INTO player_hands (game_state_id, user_id) VALUES (1, 1);
INSERT INTO player_hands (game_state_id, user_id) VALUES (1, 2);