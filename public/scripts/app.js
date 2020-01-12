$(() => {
  $.ajax({
    method: "GET",
    url: "/api"
  }).done((users) => {
    console.log(users)
    for(user of users) {
      $("<div>").text(user.username).appendTo($("body"));
    }
  });;
});
