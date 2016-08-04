$(function() {
  var $blinds = $("[id^='blind']"),
      speed = 250,
      delay_val = 1500;

  $blinds.each(function(i) {
    var $blind = $blinds.eq(i),
        ht = $blind.height(),
        top_px_value = $blind.position().top + ht + "px";

    $blind.delay(speed + delay_val*i).animate({
      top: top_px_value,
      height: 0
    }, speed);
  });
});