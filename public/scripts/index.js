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

    const $gameOne = $('.game1');
    const $gameTwo = $('.game2');

    const $listRooms = $('.list-rooms');
    const $rooms = $('.rooms');
    
    const grabGames = (game_id) => {
      
      $rooms.empty();
      const createRoom = (room_id, game_id, game_started, count) => `
        <tr id="r${room_id}">
          <td>
            ${room_id}
          </td>
          <td id="c${room_id}">
            ${count} / 2
          </td>
          <td>
            ${game_started}
          </td>
        </tr>
      `
      $.ajax({
        method: 'GET',
        url: '/api/db/all',
        data: { game_id }
      }).done(rooms => {
        for (room of rooms) {
          const { room_id, count, game_started } = room;
          const newRoom = createRoom(room_id, game_id, game_started, count);
          $rooms.append(newRoom);
          document.querySelector(`#r${room_id}`).addEventListener('click', (e) => {
            document.location.href = `/rooms/${room_id}`;
            $.ajax({
              method: 'GET',
              url: `/rooms/${room_id}`
            }).done((data) => console.log('db all'));
          })
        }})
            
      };

    let setIdGOPS;
    let setIdVF;

    $joinOne.click((e) => { 

      if ($listRooms.css('display') === 'none') {

        if ($(window).width() <= 768) {
          $listRooms.css('display', 'flex');
          $gameTwo.css('display', 'none');
        } else {
          $listRooms.css('display', 'flex');
        }
        grabGames(1);
        setIdGOPS = setInterval(() => {
          grabGames(1);
        }, 5000)
      } else {
        if ($(window).width() <= 768) {
          $listRooms.css('display', 'none');
          $gameTwo.css('display', 'flex');
        } else {
          $listRooms.css('display', 'none');
        }
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        clearInterval(setIdGOPS);
      }
    })


    $joinTwo.click((e) => {
      if ($listRooms.css('display') === 'none') {
        if ($(window).width() <= 768) {
          $listRooms.css('display', 'flex');
          $gameOne.css('display', 'none');
        } else {
          $listRooms.css('display', 'flex');
        }
        grabGames(2);
        setIdGOPS = setInterval(() => {
          grabGames(2);
        }, 5000)
      } else {
        if ($(window).width() <= 768) {
          $listRooms.css('display', 'none');
          $gameOne.css('display', 'flex');
        } else {
          $listRooms.css('display', 'none');
        }
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        clearInterval(setIdVF);
      }
    })

    // HOST ROOM
    $hostOne.click((e) => {
      $.ajax({
        method: 'POST',
        url: '/rooms',
        data: { game_id: 1}
      }).done((room) => {
        const room_id = room.room_id;
        document.location.href = `/rooms/${room_id}`  //changed from /rooms/:roomid to /game/fid for consistency
      })
    })

    $hostTwo.click((e) => {
      $.ajax({
        method: 'POST',
        url: '/rooms',
        data: { game_id: 2}
      }).done((room) => {
        const room_id = room.room_id;
        document.location.href = `/rooms/${room_id}`
      })
    })

  });
})(window.jQuery, window, document);