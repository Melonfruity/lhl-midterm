/* eslint-disable camelcase */
// proper document ready function
const getGameState = function(room_id) { //returns object containing state
  return $.ajax({
    url: `/api/games/state/`,
    method: 'GET',
    data: {
      room_id: room_id
    },
    success: function(data) {
      return data;
    }
  });
};




const roomIdFromUrl = function(url) {
  let output = '';
  for (let i = url.length - 1; i >= 0; i--) {
    if (url[i] === '/') {
      for (let j = i + 1; j < url.length; j++) {

        output += url[j];
      }
      return output;
    }
  }
};

//loads dealer card and other messages
const loadPage = function(message) {

  $.ajax({
    url: `/rooms/${room_id}`,
    method: 'GET',
    success: function() {
      if (message === 'Round not done') {
        $(".status").remove();
        $(".dealer-card").append(`<p class="status">Waiting For Other Players</p>`);
      } else {
        $(".dealer-card").append(`<img src="/images/standard_card_deck/${message}H.jpg" class="card" value="${message}"><p class="announcement">${message}</p>`);
      }

    }
  });
};

const loadCards = function(message) {

  $.ajax({
    url: `/rooms/${room_id}`,
    method: 'GET',
    success: function() {
      let output = '';
      let suit = message.suit;
      delete message.suit;
      for (let card in message) {
        if (message[card] > 0) {
          output += `${card.slice(5)}, `;
          $(`.player-hand`).append(`<img src="/images/standard_card_deck/${card.slice(5)}${suit}.jpg" class="card" value="${card.slice(5)}">`);
        }
      }
      $(`.player-message`).remove();
      $(`.player-hand`).append(`<div class="player-message"> ${output}</p>`);
    }
  })
    .then(() => {
      $('.card').on('click', (function() {
        $.ajax({
          method: "post",
          url: "/api/games/hand",
          data: {
            pickedCard: $(this).attr('value')
          },
          success: function(data) {
            console.log("data from success: card on click ", data);
          },
          error: function(xhr) {
            console.log("data from error: card on click ", xhr);
          }
        });
      }));
    });

};

const startRound = function(room_id, game_state_id) {



  $.ajax({
    method: "get",
    url: `/api/games/start/?room_id=${room_id}`,
    success: function(data) {
      // console.log(data.rows);
      bool = false;
      //console.log('hello');

      getPlayerhand(game_state_id);
    },
    error: function(xhr) {
      console.log("error from get start", xhr)
    }
  });

};

const getPlayerhand = function(game_state_id) {
  console.log('pre-getplayerhand');
  $.ajax({
    method: "get",
    url: `/api/games/hand/?game_state_id=${game_state_id}`,

    success: function(data) {
      console.log('getplayerhand', data);
      loadCards(data);
    }
  });
};

let roundInput = [];
let room_id;
let gameOver = false;
let game_state_id;

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


$(document).ready(function() {



  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
  
    //initialize game
    const pageURL = $(location).attr("href");
    room_id = roomIdFromUrl(pageURL);

    console.log('pre room', room_id)


    getNewDealerAndDisPlay(room_id)
    startRound(room_id, game_state_id)













    //run once if initialize true

    //Submit card choice for a user (this has been updated to the on img click above)
    $('.submit-button').click(function() {
      $.ajax({
        method: "post",
        url: "/api/games/hand/",
        data: {
          pickedCard: $(".submit-card").val(),
          room_id: room_id
        },
        success: function(data) {
          console.log("data from success: submit button on click ", data);

        },
        error: function(xhr) {
          console.log("data from error: submit button on click ", xhr);
        },
      });
    });

    //long polling check if round is over
    setInterval(function() {
      if (!gameOver) {
        $.ajax({
          method: "get",
          url: `/api/games/round/?room_id=${room_id}`,
          success: function(data) {
            if (data.winner) {

              loadPage(`Winner: ${data.winner}, Score: ${data.score}, Round: ${data.round_number}`);
              getNewDealerAndDisPlay(room_id);
              startRound(room_id, game_state_id)

            } else
              loadPage('Round not done');

          }
        });

      }
    }, 3000);

  });

});
