var ninjaA = (function(){
 function Ninja(){};
 return new Ninja();
})();

var ninjaB = Object.create(ninjaA);
// create a ninjaB object

console.log(ninjaB.constructor === ninjaA.constructor);    // this should be true