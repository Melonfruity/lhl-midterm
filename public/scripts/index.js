// proper document ready function
(function($, window, document) {

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
<<<<<<< HEAD
    // JOIN ROOM
    
    // HOST ROOM
=======
    $.ajax({
      method: "GET",
      url: "/tests"
    }).done((users) => {
      console.log(users)
      for (user of users) {
        $("<div>").text(user.username).appendTo($("body"));
      }
    });
    $.ajax({
      method: "POST",
      url: "/tests",
      data: { username: 'user', password: 'pass' },
    }).done((users) => {
      console.log(users)
      for (user of users) {
        $("<div>").text(user.username).appendTo($("body"));
      }
    });
>>>>>>> 0fd525abc0a9149cff3143a47aa4ed7c4bcf4f23
  });

})(window.jQuery, window, document);