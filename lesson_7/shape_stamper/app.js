$(function() {
  var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext('2d'),
      radius = 15;

  var Stamper = {
    stamp: function(x, y) {}
  };

  var circle_stamper = Object.create(Stamper);
  circle_stamper.stamp = function(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  var square_stamper = Object.create(Stamper);
  square_stamper.stamp = function(x, y) {
    ctx.fillRect(x, y, 2*radius, 2*radius);
  }

  var triangle_stamper = Object.create(Stamper);
  triangle_stamper.stamp = function(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x + radius, y + radius);
    ctx.lineTo(x - radius, y + radius);
    ctx.lineTo(x, y - radius);
    ctx.fill();
    ctx.closePath();
  }

  var stamp_arr = [circle_stamper, square_stamper, triangle_stamper];

  $("#color").on("blur", function(e) {
    ctx.fillStyle = $("#color").val();
  });

  $(".shape-btn").on("click", function(e) {
    e.preventDefault();
    $("li").removeClass("current");
    $(e.currentTarget).parent().addClass("current");
  });

  $("canvas").on("click", function(e) {
    var idx = $(".current").index();
        
    if(idx >= 0) {
      var stamper = stamp_arr[idx];
      stamper.stamp(e.offsetX, e.offsetY);
    }
  });

  $("#clear").on("click", function(e) {
    e.preventDefault();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  })
});