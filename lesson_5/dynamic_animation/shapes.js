$(function() {
  $("form").submit(function(e) {
    e.preventDefault();

    var inputs = $(this).serializeArray(),
        $new_shape = $("<div></div>"),
        ns_class = inputs[0].value,
        start_x = inputs[1].value,
        start_y = inputs[2].value,
        end_x = inputs[3].value,
        end_y = inputs[4].value;

    $new_shape.addClass(ns_class);
    $new_shape.css("top", start_y + "px");
    $new_shape.css("left", start_x + "px");

    $new_shape.data("start_x", start_x);
    $new_shape.data("start_y", start_y);
    $new_shape.data("end_x", end_x);
    $new_shape.data("end_y", end_y);

    $("#canvas").append($new_shape);
  });

  $("#stop").click(function(e) {
    e.preventDefault();
    $("#canvas > div").stop();
  });

  $("#start").click(function(e) {
    e.preventDefault();

    var $shapes = $("#canvas > div");
    $.each($shapes, function(idx, shape) {
      $(shape)
        .stop()
        .css({ 
          top: $(shape).data("start_y") + "px",
          left: $(shape).data("start_x") + "px"
        })
        .animate({
          top: $(shape).data("end_y"),
          left: $(shape).data("end_x")
        }, 1000);
    });
  });
});