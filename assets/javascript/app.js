$(document).ready(function() {
  event.preventDefault();
  var animals = ["cat", "dog", "chinchilla", "rabbit","pig","sugar gilder","snake","skunk","ferret","monkey"];

  // Add buttons for original animals array,render button first
  function renderButtons() {
    event.preventDefault();
    $("#animal-buttons").empty();
    for (i = 0; i < animals.length; i++) {
      $("#animal-buttons").append(
        "<button class='btn btn-secondary' data-animal='" +
          animals[i] +
          "'>" +
          animals[i] +
          "</button>"
      );
    }
  }

  renderButtons();

  // Adding a button for animal entered
  $("#add-animal").on("click", function() {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
    return;
  });

  // Getting gifs from api... onto html
  $("button").on("click", function() {
    event.preventDefault();

    var animal = $(this).attr("data-animal");
    var apikey = "AlOi1T9qT0mDqSLgkuIjrXwVBMMlbjK7";
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=" +
      apikey +
      "&limit=15";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      // dump the container first
      $("#animals").empty();

      //   for loop for the iteration of multiple display of images
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImg = $("<img>");

        // image attributes
        animalImg.attr("src", results[i].images.downsized.url);
        animalImg.attr("animated", results[i].images.downsized.url);
        animalImg.attr("data-animate", results[i].images.original.url);
        animalImg.attr("data-state", "still");
        animalImg.attr("class", "gif");

        animalDiv.append(p);
        animalDiv.append(animalImg);
        $("#animals").append(animalDiv);
      }
    });
  });

  //   if the state is static, make it orignal or animated
  function makeAnimated() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("animated");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }

  // $(document).on("click", "#input", displayImg);
  $(document).on("click", ".gif", makeAnimated);
});
