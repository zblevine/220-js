Object.prototype.begetObject = function() {
  function F() {};
  F.prototype = this;
  return new F();
}

var foo = {a: 1};
var bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar)); 
console.log(bar.a);