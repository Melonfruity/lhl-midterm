// proper document ready function
(function($, window, document){

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    $.ajax({
      method: "GET",
      url: "/tests"
    }).done((users) => {
      console.log(users)
      for(user of users) {
        $("<div>").text(user.username).appendTo($("body"));
      }
    });
    $.ajax({
      method: "POST",
      url: "/tests",
      data: { username: 'user', password: 'pass'},
    }).done((users) => {
      console.log(users)
      for(user of users) {
        $("<div>").text(user.username).appendTo($("body"));
      }
    });
  })

})(window.jQuery, window, document);