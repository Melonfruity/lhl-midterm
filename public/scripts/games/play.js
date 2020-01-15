// proper document ready function
const loadPage = function() {
  const message = 'hi there';
  $.ajax({
    url: '/game',
    method: 'GET',
    success: function() {
      $(".announcement").remove();
      $("body").append(`<p class="announcement">${message}</p>`);
    }
  });
};

let roundInput = [];

(function($, window, document) {

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    $('.submit-button').click(function() {

      $.ajax({
        method: "post",
        url: "/api/games/hand",
        
        data: {
          user_id: $(".submit-card").val(),
          pickedCard: $(".user_id").val()
        },
        success: function(data) {
          
          console.log(data);

          loadPage();
        },
        error: function(xhr) {
          console.log(xhr);
        },
        
      });
    });
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