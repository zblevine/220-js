function extend(destination) {
  for (var i = 1; i < arguments.length; i++) {
    var another_one = arguments[i];
    for (var prop in another_one) {
      if (Object.prototype.hasOwnProperty.call(another_one, prop)) {
        destination[prop] = another_one[prop];
      }
    }
  }

  return destination;
}

var foo = {
  a: 0,
  b: {x: 1, y: 2},
};

var joe = {
  name: "Joe",
};

var funcs = {
  sayHello: function() {
    console.log("Hello, " + this.name);
  },

  sayGoodBye: function() {
    console.log("Goodbye, " + this.name);
  },
};

var object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // 1
console.log(object.sayHello());   // Hello, Joe