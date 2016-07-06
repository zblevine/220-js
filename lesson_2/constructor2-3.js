function createObject(obj) {
  var new_one = {};
  for(var prop in obj) {
    new_one[prop] = obj[prop];
  }
  Object.setPrototypeOf(new_one, obj);
  return new_one;
};

var foo = {a: 1};
var bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));         // true
console.log(bar);