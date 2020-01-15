// proper document ready function
(function($, window, document) {

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    // JOIN ROOM
    const $joinZero = $('#0');
    const $joinOne = $('#1');

    const $gameInfo = $('.game-info');
    const $listRooms = $('.list-rooms');
    const $listGames = $('.list-games');

    $joinZero.click((e) => {
      if ($gameInfo.css('display') === 'flex') {
        $gameInfo.css('display', 'none');
        $listGames.css('width', '30%');
        $listRooms.css('display', 'flex');
        $listRooms.css('width', '70%');
      } else {
        $gameInfo.css('display', 'flex');
        $listGames.css('width', '100%');
        $listRooms.css('display', 'none');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    })

    $joinOne.click((e) => {
      if ($gameInfo.css('display') === 'flex') {
        $gameInfo.css('display', 'none');
        $listGames.css('width', '30%');
        $listRooms.css('display', 'flex');
        $listRooms.css('width', '70%');
      } else {
        $gameInfo.css('display', 'flex');
        $listGames.css('width', '100%');
        $listRooms.css('display', 'none');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    })


    // HOST ROOM
  });

})(window.jQuery, window, document);