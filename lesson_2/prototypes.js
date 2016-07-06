function getDefiningObject(object, propKey) {
  if (!(propKey in object)) {
    return null;
  } else if (object.hasOwnProperty(propKey)) {
    return object;
  } else {
    return getDefiningObject(Object.getPrototypeOf(object), propKey);
  }
}

var foo = {a: 1, b: 2};
var bar = Object.create(foo);
var baz = Object.create(bar);
var qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // true
console.log(getDefiningObject(qux, 'e'));             // null
   