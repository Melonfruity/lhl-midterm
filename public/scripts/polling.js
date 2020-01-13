// proper document ready function
(function($, window, document){

  $(function() {
    setInterval(function(){
      $.ajax({
        method: "GET",
        url: "/api/"
      }).done((users) => {
        console.log(users)
        for(user of users) {
          $("<div>").text(user.username).appendTo($("body"));
        }
      });
    }, 3000);
  })

})(window.jQuery, window, document);