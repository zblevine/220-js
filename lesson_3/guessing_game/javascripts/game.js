$(function() {
  var answer = Math.ceil(Math.random()*100);
  var number_of_guesses = 0;

  $("form").on("submit", function(e) {
    e.preventDefault();
    var guess = +$("input#guess").val();
    number_of_guesses++;
    var guess_msg;

    if (guess > answer) {
      guess_msg = "Too high, nice guy! (" + guess + ")";
    } else if (guess < answer) {
      guess_msg = "Too low, sloppy Joe! (" + guess + ")";
    } else {
      guess_msg = "You got it! It took you " + number_of_guesses + " tries.";
    }

    $("#guess_msg").text(guess_msg);
  });

  $("a").on("click", function(e) {
    e.preventDefault();
    answer = Math.ceil(Math.random()*100);
    number_of_guesses = 0;
    $("#guess_msg").text("Guess a number from 1 to 100");
    $("#guess").val("");
  })
});