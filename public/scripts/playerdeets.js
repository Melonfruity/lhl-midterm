$(() => {

  const $login = $('#login');
  const $register = $('#register');
  const $guest = $('guest');
  const $username = $('#username');
  const $password = $('#password');

  const $errorMsg = $('.error-msg');
  const login = (guest) => {
    const username = guest ? 'guest' : $username.val();
    const password = guest ? 'guest' : $password.val();
    if (username.length < 3 || password.length < 3 && guest) {
      $errorMsg.text('USER OR PASSWORD TOO SHORT');
    } else {
      $.ajax({
        method: "POST",
        url: "/api/users/login",
        data: {username, password}
      }).done((users) => window.location.reload())
      .always(data => {
        if (data.fail().responseText) {
          $errorMsg.text('WRONG USER OR PASSWORD');
        }
      });
    }
  }

  $login.on('click', (e) => {
    e.preventDefault();
    login(false);
  });

  $guest.on('click', (e) => {
    e.preventDefault();
    login(true);
  });

  $register.on('click', (e) => {
    e.preventDefault();
    if ($username.val().length < 3 || $password.val().length < 3) {
      $errorMsg.text('USER OR PASSWORD TOO SHORT');
    } else {
      $.ajax({
        method: "POST",
        url: "/api/users/register",
        data: {username: $username.val(), password: $password.val()}
      }).done((users) => window.location.reload())
        .always(data => {
        if (data.fail().responseText) {
          $errorMsg.text('USER TAKEN');
        }
      });
    }
  });

  const $profileDetails = $('#profile-details');

  $.ajax({
    method: "GET",
    url: "/profile",
  }).done((data) => {
    const { user_id, userDetail, gameDetail, gamesPlayed } = data;
    const profileDetails = `
      <img class='profile-image' src="${userDetail.img_url}">
      <h4> ${userDetail.username} </h4>
      <p>Player Since: ${userDetail.player_since} </p>
      <p>Games Played: ${gamesPlayed.games_played} </p>
      <p>Games Won: ${gameDetail.games_won} </p>
    `
    $profileDetails.append(profileDetails);
  });
});

