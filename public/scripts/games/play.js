// proper document ready function
const loadPage = function(message) {

  $.ajax({
    url: '/game',
    method: 'GET',
    success: function() {
      if (message === 'not done') {
        $(".status").remove();
        $("body").append(`<p class="status">not done</p>`);
      }
      else {
        $("body").append(`<p class="announcement"> ${message}</p>`)
      }

    }
  });
};

const loadCards = function(message, id) {

  $.ajax({
    url: '/game',
    method: 'GET',
    success: function() {
      $("body").append(`<div class="player1-hand"> ${message}</p>`)
      }

    
  });
};

const startRound = function(bool) {
  if (bool) {
    $.ajax({
      method: "post",
      url: "/api/games/start",
      data: {
        game_state_id: 1
      },
      success: function(data) {
        bool = false;
        loadPage(`The card value is ${data.cardValue}`)
      }
    })
  }
}

const getPlayerhand = function(id) {
  setInterval(function() {
    $.ajax({
      method: "get",
      url: "/api/games/hand",
      
      success: function(data) {
        
        loadCards(`${data.rows[0]}`, );
      }
    })
  }, 3000)
}

let roundInput = [];

(function($, window, document) {
  let gameOver = false;
  let initialize = true;


  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    //initialize game

    startRound(initialize); //run once if initialize true


    //Submit card choice for a user
    $('.submit-button').click(function() {
      $.ajax({
        method: "post",
        url: "/api/games/hand",
        data: {
          user_id: $(".user_id").val(),
          pickedCard: $(".submit-card").val()
        },
        success: function(data) {
          console.log(data);

        },
        error: function(xhr) {
          console.log(xhr);
        },
      });
    });
    getPlayerhand();

    //long polling check if round is over
    setInterval(function() {
      if (!gameOver) {
        $.ajax({
          method: "post",
          url: "/api/games/round",
          data: {
            game_state_id: '1'
          },
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

})(window.jQuery, window, document);