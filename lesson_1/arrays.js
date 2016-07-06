function oddElementsOf(arr) {
  var odds = [];
  for(var i = 1; i < arr.length; i += 2) {
    odds.push(arr[i]);
  }

  return odds;
}

function combinedArray(first, second) {
  var comb = [];
  for(var i = 0; i < first.length; i++) {
    comb.push(first[i]);
    comb.push(second[i]);
  }

  return comb;
}

function matrixSums(arr) {
  return arr.map(function(obj) {
    return obj.reduce(function(prev, curr) {
      return prev + curr;
    });
  });
}

function uniqueElements(arr) {
  new_arr = [];
  for(var i = 0; i < arr.length; i++) {
    if(arr.indexOf(arr[i]) === i) {
      new_arr.push(arr[i]);
    }
  }

  return new_arr;
}

console.log(matrixSums([[2, 8, 5], [12, 48, 0], [12]]));
console.log(uniqueElements([1, 2, 4, 3, 4, 1, 5, 4]));