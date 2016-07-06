function Vehicle() {};

Vehicle.prototype = {
  doors: 4,
  wheels: 4
}

function Coupe() {};
Coupe.prototype = new Vehicle();
Coupe.prototype.constructor = Coupe;
Coupe.prototype.doors = 2;

function Motorcycle() {};
Motorcycle.prototype = new Vehicle();
Motorcycle.prototype.constructor = Motorcycle;
Motorcycle.prototype.doors = 0;
Motorcycle.prototype.wheels = 2;

function Sedan() {};
Sedan.prototype = Object.create(Vehicle.prototype);

var moto = new Motorcycle();
var coupe = new Coupe();
console.log(moto);
console.log(coupe);
console.log(coupe instanceof Coupe);
console.log(coupe instanceof Vehicle);

var sedan = new Sedan();
console.log(sedan.doors);
console.log(sedan instanceof Sedan);
console.log(sedan instanceof Vehicle);

