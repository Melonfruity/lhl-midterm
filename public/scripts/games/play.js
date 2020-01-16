// proper document ready function

const loadPage = function (message) {

  $.ajax({
    url: '/game',
    method: 'GET',
    success: function () {
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

const loadCards = function (message, user_id) {
  console.log("load cards gets called")

  $.ajax({
    url: '/game',
    method: 'GET',
    success: function () {
      let output = '';
      let suit = message.suit;
      delete message.suit;
      for (let card in message) {
        if (message[card] > 0) {
          output += `${card.slice(5)}, `;
          $(`.player${user_id}-hand`).append(`<img src="/images/standard_card_deck/${card.slice(5)}${suit}.jpg" class="card" value="${card.slice(5)}">`)
        }
      }
      console.log("ajax call is completed under load cards");
      $(`.player${user_id}-message`).remove();
      $(`.player${user_id}-hand`).append(`<div class="player${user_id}-message"> ${output}</p>`)
    }
  })
  .then(() => {
    $('.card').on('click', (function () {
      console.log("I've been clicked")
      $.ajax({
        method: "post",
        url: "/api/games/hand",
        data: {
          user_id: $(".user_id").val(),
          pickedCard: $('.card').attr('value')
        },
        success: function (data) {
          console.log(data);
        },
        error: function (xhr) {
          console.log(xhr);
        }
      })
    }))
  });

};

const startRound = function (bool, user_id, game_state_id) {
  if (bool) {

    $.ajax({
      method: "post",
      url: "/api/games/start",
      data: {
        game_state_id: 1
      },
      success: function (data) {
        bool = false;
        loadPage(data.cardValue);
        getPlayerhand(1, 1); // currently hardcoded
        getPlayerhand(2, 1); // currently hardcoded
      }
    });
  }
};

const getPlayerhand = function (id, game_state_id) {
  $.ajax({
    method: "get",
    url: `/api/games/hand?user_id=${id}&game_state_id=${game_state_id}`,
    success: function (data) {
      loadCards(data, id);
    }
  });
};

let roundInput = [];
let initialize = true;

$(document).ready(function () {
  let gameOver = false;


  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function () {
    //initialize game

    startRound(initialize); //run once if initialize true

    //Submit card choice for a user (this has been updated to the on img click above)
    $('.submit-button').click(function () {
      $.ajax({
        method: "post",
        url: "/api/games/hand",
        data: {
          user_id: $(".user_id").val(),
          pickedCard: $(".submit-card").val()
        },
        success: function (data) {
          console.log(data);
        },
        error: function (xhr) {
          console.log(xhr);
        },
      });
    });

    //long polling check if round is over
    setInterval(function () {
      if (!gameOver) {
        $.ajax({
          method: "post",
          url: "/api/games/round",
          data: {
            game_state_id: '1'
          },
          success: function (data) {
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
    // $.ajax({
    //   method: "POST",
    //   url: "/game",
    //   data: { username: 'user', password: 'pass' },
    // }).done((users) => {
    //   console.log(users)
    //   for (user of users) {
    //     $("<div>").text(user.username).appendTo($("body"));
    //   }
    // });
  });

})
