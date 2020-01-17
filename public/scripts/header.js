// proper document ready function
(function($, window, document){

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {

    const $profile = $('#nav-profile');
    const $playerDeets = $('.player-deets');
    const $mainContainer = $('.main-container');

    $profile.click((e) => {
      if ($playerDeets.css('display') === 'block') {
        $playerDeets.css('display', 'none');
        $mainContainer.css('width', '100%');
      } else {
        $playerDeets.css('display', 'block');
        $mainContainer.css('width', '75%');
      }
      // if ($mainContainer.css('width') === '75%') {
      //   $playerDeets.animate({width: 'toggle'}, 50);
      //   $mainContainer.css('width', '100%');
      // } else {
      //   $playerDeets.animate({width: 'toggle'}, 50);
      //   $mainContainer.css('width', '75%');
      // }
    });

  });

})(window.jQuery, window, document);
