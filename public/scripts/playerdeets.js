$(() => {
        
  const $login = $('#login');
  const $register = $('#register');
  const $username = $('#username'); 
  const $password = $('#password');

  $login.on('click', (e) => {
    e.preventDefault();
    console.log($username.val(), $password.val())
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data: {username: $username.val(), password: $password.val()}
    }).done((users) => {
      window.location.reload();
    });
  })

  $register.on('click', (e) => {
    e.preventDefault();
    console.log($username.val(), $password.val())
    $.ajax({
      method: "POST",
      url: "/api/users/register",
      data: {username: $username.val(), password: $password.val()}
    }).done((users) => {
      window.location.reload();
    });  
  })
});

