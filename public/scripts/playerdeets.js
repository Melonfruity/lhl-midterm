$(() => {
        
  const $login = $('#login');
  const $register = $('#register');
  const $username = $('#username'); 
  const $password = $('#password');

  let password;
  let username;

  $username.change(() => {
    username = $username.val()
  })

  $username.change(() => {
    password = $password.val()
  })

  $login.on('click', (e) => {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data: {username, password}
    }).done((users) => {
      console.log(users)
    });  
  })

  $login.on('click', (e) => {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/users/register",
      data: {username, password}
    }).done((users) => {
      console.log(users)
    });  
  })

});

