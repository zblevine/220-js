$(function() {
  var words = ["bulls", "mavericks", "thunder", "magic", "knickerbockers", "trailblazers"],
      randomWord = function() {
        function randInt(num) {
          return Math.floor(Math.random()*num);
        }

        var rand_idx = randInt(words.length),
            random_word = words[rand_idx];

        words.splice(rand_idx, 1);
        return random_word;
      },
      classes = ["six", "five", "four", "three", "two", "one", "zero"],
      Game = {
        incorrect: 0,
        correct: 0,
        max_wrong: 6,
        setup_blanks: function() {
          for(var i = 0, len = this.word.length; i < len; i++) {
            $("#game_word").append("<span class='letter'>&nbsp;</span>\n");
          }
        },
        fill_blanks: function(letter) { //returns number of blanks filled
          var word = this.word,
              num_blanks = 0;
          for(var i = 0, len = word.length; i < len; i++) {
            if(letter === word.charAt(i)) {
              $("#game_word .letter").eq(i).text(letter);
              num_blanks += 1;
            }
          }

          return num_blanks;
        },
        init: function(word) {
          var new_arr = [];

          this.word = randomWord(words),
          this.guessed = new_arr,
          this.setup_blanks();
        },
      },
      current_game = Object.create(Game);

  current_game.init();

  $(document).on("keypress", function(e) {
    var letter = String.fromCharCode(e.which);
    if(!letter.match(/[a-z]/i)) {
      return;
    }
    console.log(current_game.guessed);
    if(!current_game.guessed.includes(letter)) {
      current_game.guessed.push(letter);
      $("#guesses").append("<span class='letter'>" + letter + "</span>\n");
      
      var num_blanks = current_game.fill_blanks(letter);
      if(num_blanks > 0) {
        current_game.correct += num_blanks;
        if(current_game.correct === current_game.word.length) {
          $("body").addClass("win").animate({
            backgroundColor: "#06c"
          }, 1000);
        }
      } else {
        $(".apples").toggleClass(classes[current_game.incorrect]);
        current_game.incorrect += 1;
        $(".apples").toggleClass(classes[current_game.incorrect]);

        if(current_game.incorrect === current_game.max_wrong) {
          $("body").addClass("lose").animate({
            backgroundColor: "#b00b00"
          }, 1000);
        }
      }
    }
  });

  $("#play_again").click(function(e) {
    e.preventDefault();
    $("body").removeClass();
    if(words.length > 0) {
      $(".letter").remove();
      $("body").attr("style", "");
      current_game = Object.create(Game);
      current_game.init();
      console.log(current_game);

      $(".apples").attr("class", "apples six");
    } else {
      $("body").addClass("done");
    }
  })
});