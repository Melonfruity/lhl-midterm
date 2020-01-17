const getNewDealerAndDisPlay = function(room_id) {
  $.ajax({
    method: "post",
    url: `/api/games/deal/?room_id=${room_id}`,
    success:
      getGameState(room_id)
        .then(data => {
          console.log('data',data)
          dealer_card = data.dealer_card;
          game_state_id = data.id;
          loadPage(dealer_card);
        })



  });
}



$(function() {
  console.log('hello');
  //initialize game
  const pageURL = $(location).attr("href");
  room_id = roomIdFromUrl(pageURL);
  getNewDealerAndDisPlay(room_id);

}