

with x as (
  
  SELECT card_1 
FROM game_states
WHERE game_states.id = 1;
)
update player_hands 
  set score = 3 
  where user_id = 3  
  returning *;