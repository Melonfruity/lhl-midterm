// proper document ready function
(function($, window, document) {

  // example of how to get and post to the server.
  // In this case, to the test server
  // checkout routes/tests.js

  $(function() {
    // JOIN ROOM
    const $joinOne = $('#j1');
    const $joinTwo = $('#j2');
    const $hostOne = $('#h1');
    const $hostTwo = $('#h2');

    const $gameInfo = $('.game-info');
    const $listRooms = $('.list-rooms');
    const $listGames = $('.list-games');
    const $rooms = $('.rooms');
    
    const grabGames = (game_id) => {
      
      $rooms.empty();

      const createRoom = (room_id, game_id, game_started) => `
        <tr id="r${room_id}">
          <td>
            ${game_id}
          </td>
          <td>
            1/2
          </td>
          <td>
            ${game_started}
          </td>
        </tr>
      `

      if ($gameInfo.css('display') === 'flex') {
        $gameInfo.css('display', 'none');
        $listGames.css('width', '30%');
        $listRooms.css('display', 'flex');
        $listRooms.css('width', '70%');

        $.ajax({
          method: 'GET',
          url: '/api/db/all',
          data: { game_id }
        }).done(rooms => {
          for (room of rooms) {
            const newRoom = createRoom(room.id, room.game_id, room.game_started);
            $rooms.append(newRoom);
            document.querySelector(`#r${room.id}`).addEventListener('click', (e) => {
              document.location.href = `/game/:${game_id}`;
            })
          }
        });
        
      } else {
        $gameInfo.css('display', 'flex');
        $listGames.css('width', '100%');
        $listRooms.css('display', 'none');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }

    $joinOne.click((e) => {
      grabGames(1);
    })


    $joinTwo.click((e) => {
      grabGames(2);
    })

    // HOST ROOM
    $hostOne.click((e) => {
      $.ajax({
        method: 'POST',
        url: '/rooms',
        data: { game_id: 1}
      }).done((room) => {
        console.log(room)
        const room_id = room.room_id;
        document.location.href = `/rooms/:${room_id}`
      })
    })

    $hostTwo.click((e) => {
      $.ajax({
        method: 'POST',
        url: '/rooms',
        data: { game_id: 2}
      }).done((room) => {
        console.log(room)
        const room_id = room.room_id;
        document.location.href = `/rooms/:${room_id}`
      })
    })
  });

})(window.jQuery, window, document);