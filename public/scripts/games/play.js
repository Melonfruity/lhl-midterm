// proper document ready function
(function($, window, document){

  $(function() {
    
    // grab room location
    const room_id = $(location).attr("href").substring(48);
    const $dealerCard = $('.dealer-card');
    const $playerHand = $('.player-hand');
    const $message = $('.message');
    const $scoreboard = $('.score-tracker');

    let dealer_card;
    let thisTotal;
    let theirTotal;
    let thisRoundScore;
    let theirRoundScore;

    // create image function
    const image = (num, type) => `<img src="/images/standard_card_deck/${num}H.jpg" class="${type}${num} card" value="${num}">`
    
    const trackerTemplate = (thisScore, theirScore) => `
      <tr>
        <td>
          ${thisScore}
        </td>
        <td>
          ${theirScore}
        </td>
      </tr>`

    // add a new/replace dealer card
    const replaceDealerCard = (val) => {
      $dealerCard.empty();
      $dealerCard.append(image(val, 'D'))
    }

    // calculate score and append

    // allows user to play card only if the
    // played_this_turn flag is false
    const playCard = (val, card) => {
      
      $.ajax({
        method: 'post',
        url: '/api/games/play',
        data: {
          room_id,
        }
      }).done(data => {
        if (!data.played_this_round) {
          $.ajax({
            method: 'post',
            url: '/api/games/hand',
            data: {
              cardNum: val,
              room_id
            }
          }).done(data => card.remove())
        } else {
          console.log('Waiting on next player');
        }
      })
    }

    const startGame = () => {
      setInterval(() => {

        $.ajax({
          method: 'get',
          url: '/api/games/updateGame',
          data: {
            room_id,
            dealer_card
          }
        }).done(data => {
          if(data.score) {
              data.score.forEach(val => {
                console.log(val, val.score, val.user_id)
              if (Number(val.user_id) === Number(data.user_id)) {
                thisTotal += Number(val.score);
                thisRoundScore = val.score;
              } else {
                theirTotal += Number(val.score);
                theirRoundScore = val.score;
                console.log(theirRoundScore)
              }
            });
            $scoreboard.append(trackerTemplate(thisRoundScore, theirRoundScore));
          }
          dealer_card = data.dealer_card;
          replaceDealerCard(data.dealer_card);
        })

      }, 3000)
    };

    // deals out the first card
    const initializeGame = () => {
      $.ajax({
        method: 'get',
        url: '/api/games/initiate',
        data: {
          room_id,
        }
      }).done(data => {
          if (data.dealer_card) {
            dealer_card = data.dealer_card;
            replaceDealerCard(data.dealer_card);
          }
        });

      $.ajax({
        method: 'get',
        url: '/api/games/hand',
        data: {
          room_id,
        }
      }).done(data => {
        $playerHand.empty();
        for (let i = 1; i <= 13; i ++) {
          if (data[`card_${i}`]) {
            $playerHand.append(image(i, 'P'))
            const card = $(`.P${i}`);
            card.click((e) => {
              const val = card.attr('value');
              playCard(val, card);
            })
          }
        }
        startGame();
      });
    };
    initializeGame();
  })

})(window.jQuery, window, document);
