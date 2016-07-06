function average(numbers) {
  return sum(numbers) / numbers.length;
}

function sum(numbers) {
  var total = 0;
  for(var i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total;
}

function fizzBuzz() {
  for(var i = 1; i <= 100; i++) {
    if(i % 15 === 0) {
      console.log("FizzBuzz");
    }
    else if(i % 5 === 0) {
      console.log("Buzz");
    }
    else if(i % 3 === 0) {
      console.log("Fizz");
    }
    else {
      console.log(i);
    }
  }
}

function randInt(max) {
  return Math.floor(Math.random()*max);
}

fizzBuzz();