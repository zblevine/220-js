var shape = {
  type: "shape",
  getType: function() {
    return this.type;
  },
  getPerimeter: function() {
    var props = Object.getOwnPropertyNames(this);
    var per = 0;
    for(var i in props) {
      var prop = props[i];
      if(Number.isInteger(this[prop])) {
        per += this[prop];
      }
    }

    return per;
  }
}

function Triangle(a, b, c) {
  this.type = "triangle";
  this.a = a;
  this.b = b;
  this.c = c;
}

Triangle.prototype = shape;
Triangle.prototype.constructor = Triangle;

var t = new Triangle(1, 2, 3);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 6
console.log(t.getType()); 