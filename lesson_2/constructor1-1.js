var Circle = function(radius) {
  this.radius = radius;
};

Circle.prototype.area = function() {
  return Math.PI*Math.pow(this.radius, 2);
};

var a = new Circle(3),
    b = new Circle(4);

console.log(a.area().toFixed(2)); // 28.27
console.log(b.area().toFixed(2)); // 50.27