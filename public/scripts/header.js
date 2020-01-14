// proper document ready function
(function($, window, document){

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    
    const $profile = $('#nav-profile');
    const $listRooms = $('.list-rooms');
    const $listGames = $('.list-games');
    const $gameInfo = $('.game-info');
    const $playerDeets = $('.player-deets')
    const $mainContainer = $('.main-container');

    console.log($profile, $listRooms, $listGames);

    $profile.click((e) => {
      if ($playerDeets.css('display') === 'block') {
        $playerDeets.css('display', 'none');
        $mainContainer.css('width', '100%');
      } else {
        $playerDeets.css('display', 'block');
        $mainContainer.css('width', '75%');
      }
    })



    // $.click((e) => {
    //   e.preventDefault();
    //   $gameInfo.css('display', 'none');
    //   $listGames.css('width', '30%');
    //   $listRooms.css('display', 'flex');
    //   $listRooms.css('width', '70%');
    // })

  });

})(window.jQuery, window, document);