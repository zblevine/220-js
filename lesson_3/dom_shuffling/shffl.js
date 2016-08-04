window.onload = function() {
  var img_mop = $("figure:first img").clone();
  var img_chin = $("figure:last img").clone();
  $("figure:first img").replaceWith(img_chin);
  $("figure:last img").replaceWith(img_mop);
  $("article").append($("figure"));

  $("body").prepend($("body > header"));
  $("body > header").prepend($("main > h1"));
}