var canvas = document.querySelector("canvas");
var ctx = canvas.getContext('2d');

var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = x;

ctx.beginPath();
ctx.fillStyle = "#00f";
ctx.arc(x, y, radius, 0, 2 * Math.PI);
ctx.fill();
ctx.closePath();