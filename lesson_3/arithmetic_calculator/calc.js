window.onload = function() {
  document.getElementById("expr").onsubmit = function(e) {
    e.preventDefault();
    var output,
        op = document.getElementById("op").value,
        n1 = +(document.getElementById("n1").value),
        n2 = +(document.getElementById("n2").value);

    switch (op) {
      case "+":
        output = n1 + n2;
        break;
      case "-":
        output = n1 - n2;
        break;
      case "*":
        output = n1 * n2;
        break;
      default:
        output = n1 / n2;
    }

    document.getElementById("output").innerHTML = output;
  };
};