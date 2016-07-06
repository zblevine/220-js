function shallowCopy(object) {
  var props = Object.getOwnPropertyNames(object);
  var new_obj = Object.create(Object.getPrototypeOf(object));
  props.forEach(function(prop) {
    new_obj[prop] = object[prop];
  });

  return new_obj;
};

var foo = {a: 1, b: 2};
var bar = Object.create(foo);

bar.c = 3;
bar.say = function() {
  console.log("c is " + this.c);
};


var baz = shallowCopy(bar);

console.log(baz.a);       // 1
baz.say();    