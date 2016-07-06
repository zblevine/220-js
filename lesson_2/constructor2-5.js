function neww(constructor, args) {
  var new_one = {};
  new_one.constructor = constructor;
  constructor.apply(new_one, args);
  Object.setPrototypeOf(new_one, constructor.prototype);
  return new_one;
};

function Person(first_name, last_name) {
  this.first_name = first_name;
  this.last_name = last_name;
};

Person.prototype.greeting = function() {
  console.log("Hello, " + this.first_name + ' ' + this.last_name);
};

var john = neww(Person, ['John', 'Doe']);

john.greeting();          // Hello, John Doe
console.log(john.constructor);         // Person(first_name, last_name) {...}