$(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();

    var item_name = $("#item_name").val();
    var qty = $("#qty").val() || 1;
    var new_item = "<li>" + qty + " " + item_name + "</li>";
    $("ul").append(new_item);
    $("form")[0].reset();
  })
})