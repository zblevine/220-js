function Ninja(){
  this.swung = false;
}

var ninjaA = new Ninja();
var ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

console.log(ninjaA.swing().swung)      // this needs to be true
console.log(ninjaB.swing().swung)      // this needs to be true