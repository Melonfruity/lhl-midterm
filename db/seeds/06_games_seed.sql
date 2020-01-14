-- game state: playing
INSERT INTO games (current_player_id, game_state, game_winner_id) VALUES (1, 'playing', NULL);

-- game state changed, assuming games.id = 1
UPDATE games SET current_player_id = 2, game_state = 'playing' WHERE games.id = 1;

-- game state: ended, assuming user.id = 1
UPDATE games SET game_winner_id = 1, game_state = 'ended' WHERE games.id = 1;
