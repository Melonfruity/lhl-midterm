// proper document ready function

const roomIdFromUrl = function(url) {
  let output = '';
  for (let i = url.length - 1; i >= 0; i--) {
    if (url[i] === '/') {
      for (let j = i; j < url.length; j++) {
        output += url[j];
      }
      return output;
    }
  }
};

const loadPage = function(message) {

  $.ajax({
    url: '/rooms/:id',
    method: 'GET',
    success: function() {
      if (message === 'not done') {
        $(".status").remove();
        $(".main-container .content").append(`<p class="status">not done</p>`);
      }
      else {
        $(".main-container .content").append(`<p class="announcement"> ${message}</p>`)
      }

    }
  });
};

const loadCards = function(message, user_id) {

  $.ajax({
    url: '/rooms/:id',
    method: 'GET',
    success: function() {
      let output = '';
      //console.log(JSON.stringify(message));
      for (let card in message) {
        if (message[card] > 0) {
          output += `${card.slice(5)}, `;
        }
      }
      $(`.player-message`).remove();
      $(`.player-hand`).append(`<div class="player-message"> ${output}</p>`)
    }
  });
};

const startRound = function(bool, user_id, game_state_id) {
  if (bool) {

    $.ajax({
      method: "get",
      url: `/api/games/start/?room_id=${room_id}`,
      success: function(data) {
        bool = false;
        loadPage(data.cardValue);
        getPlayerhand(user_id, game_state_id)
      }
    });
  }
};

const getPlayerhand = function(id, game_state_id) {
  $.ajax({
    method: "get",
    url: `/api/games/hand/?game_state_id = ${game_state_id}`,
    success: function(data) {
      loadCards(data, id);
    }
  });
};

let roundInput = [];

let initialize = true;

// (function ($, window, document) {
$(document).ready(function() {
  let gameOver = false;




  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    //initialize game
    const pageURL = $(location).attr("href");
    const room_id = roomIdFromUrl(pageURL);




    startRound(initialize); //run once if initialize true
    startRound() //two users locked for now

    //Submit card choice for a user
    $('.submit-button').click(function() {
      $.ajax({
        method: "post",
        url: "/api/games/hand/",
        data: {
          pickedCard: $(".submit-card").val(),
          room_id: room_id
        },
        success: function(data) {
          console.log(data);
        },
        error: function(xhr) {
          console.log(xhr);
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
              initialize = true;
              loadPage(`Winner: ${data.winner}, Score: ${data.score}, Round: ${data.round_number}`);
              startRound(initialize);
            } else
              loadPage('not done');

          }
        })

      }
    }, 3000)

  });

})
// (window.jQuery, window, document);
