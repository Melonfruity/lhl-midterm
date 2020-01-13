# Tasks
## POST - Create Room
### Data that should be available and relevant
  1. user_id (host) 
  2. game_type_id
    - max_players
    - min_players
    - type_of_cards
    - name_of_game

### Flow
  1. Create player(s) entry in players table: return players.id
  2. Create the games entry in games table: return the games.id
  3. Create room entry in room table: use players.id, games.id

### Return
  1. players ids: player list
  2. game id: game tracking
  3. room id: room tracking

## POST - Do a turn
### Data that should be available and relevant
  1. user_id (each player) 
  2. room_id 
  3. game_id
  4. current_player (only user_id with can make that turn current_player_id)

### Flow
  1. Check/Update cards played. 
    - To see if you can update or if there's a winner. 
  2. Update games entry. 
    - Current and next player.
    - Update game_state if there's a winner.

### Return
  1. players ids: player list
  2. game id: game tracking
  3. room id: room tracking


## Notes

  All clients should be continously polling for relevant data when in a room otherwise a refresh button can be used to find games in a lobby.

  Landing -> Lobby -> Room
  1. host player enters root
    - game_type data is retrieved (GET /landing)
    - user id for host is set 
    - (render /landing)
  2. player enter lobby 
    - client gets lobby view (GET /lobby)
    - server replies with lobby view which should 
      render all the available to join games (render /lobby)
  3. host player hosts a room
    - client posts to server (POST /rooms) *
    - server replies with the room view (render /rooms/:id) and initial data
  4. players join a room
    - client does a get to server for room info (GET /rooms/:id) *
    - server replies to client with room render (render /rooms/:id)
  5. start game
    - host posts to server to start the game (POST /rooms/:id) *
    - server should only replies to host with a success or fail
  
  1. Update page based on the poll
    - Client to server using games id (POST api/games/:id)
    - If the user id being sent to games is the same as current_player
      then update the cards_played table
    - server queries cards_played table and returns to all clients (players   or host) cards_played info
    - If the update results in the game_state to be finished then the
      server send the end game page (redirect /end)