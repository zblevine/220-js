function User(first, last) {
  if(this instanceof User) {
    this.name = first + " " + last;
  } else {
    return new User(first, last);
  }
}

var name = "Jane Doe";
var user1 = new User("John", "Doe");
var user2 = User("John", "Doe");

console.log(name);        // Jane Doe
console.log(user1.name);   // John Doe
console.log(user2.name);   // John Doe