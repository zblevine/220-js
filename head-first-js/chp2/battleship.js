var loc1 = Math.floor(Math.random() * 5);
var loc2 = loc1 + 1;
var loc3 = loc2 + 1;

var guess;
var hits = 0;
var guesses = 0;

var is_sunk = false;

while(is_sunk == false) {
  guess = prompt("Ready, aim, fire! (enter a number 0-6)");

  if(guess < 0 || guess > 6) {
    alert("Please enter a valid cell number!");
  } else {
    guesses += 1;

    if(guess == loc1 || guess == loc2 || guess == loc3) {
      hits += 1;
      alert("Hit!");
    } else {
      alert("Miss!");
    }

    if(hits == 3) {
      is_sunk = true;
      alert("You sank my battleship!");
    }
  }
}

var stats = "You took " + guesses + " guesses to sink the battleship, " +
  "which means your shooting accuracy was " + (3/guesses);
alert(stats);