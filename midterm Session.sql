UPDATE game_states
SET round_number = (SELECT card_1 + card_2 + card_3 + card_4 + card_5 + card_6 + card_7 + card_8 + card_9 + card_10 + card_11 + card_12 + card_13 
FROM game_states
WHERE game_states.id = 1)
WHERE game_states.id = 1
RETURNING round_number;