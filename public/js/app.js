// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#stream-panel .css-ye6x8s").append("<p data-id='" + data[i]._id + "'>" + data[i].title +  data[i].summary + "<br />" + data[i].link + "</p>");
  }
});

$(".save").on("click", function() {
  $.ajax({
      method: "GET",
      url: "/saved",
  }).done(function(data) {
      console.log(data)
      window.location = "/"
  })
});
//Handle Save Article button
$(".save").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/save/" + thisId
  }).done(function(data) {
      window.location = "/"
  })
});

//Handle Delete Article button
$(".delete").on("click", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/delete/" + thisId
  }).done(function(data) {
      window.location = "/saved"
  })
});

//Handle Save Note button
$(".comment").on("click", function() {
  var thisId = $(this).attr("data-id");
  if (!$("#noteText" + thisId).val()) {
      alert("please enter a note to save")
  }else {
    $.ajax({
          method: "POST",
          url: "/notes/save/" + thisId,
          data: {
            text: $("#noteText" + thisId).val()
          }
        }).done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#noteText" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
  }
});

//Handle Delete Note button
$(".delete").on("click", function() {
  var noteId = $(this).attr("data-note-id");
  var articleId = $(this).attr("data-article-id");
  $.ajax({
      method: "DELETE",
      url: "/notes/delete/" + noteId + "/" + articleId
  }).done(function(data) {
      console.log(data)
      $(".modalNote").modal("hide");
      window.location = "/saved"
  })
});