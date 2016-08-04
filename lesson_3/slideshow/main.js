$(function() {
  $("li img").on("click", function(e) {
    var $fig_img = $("figure img");
    var changeImg = function($img) {
      $img.prop("src", $(this).prop("src"));
    }.bind(this);

    $(".current").toggleClass("current");
    $(this).toggleClass("current");

    $fig_img.fadeOut(400, function() {
      $fig_img.fadeIn(400);
      changeImg($fig_img);
    });
    
  });
});