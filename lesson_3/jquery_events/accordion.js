$(function() {
  var char_code;

  $("form").on("submit", function(e) {
    e.preventDefault();
    char_code = $("form input[type='text']").val().charCodeAt(0);
  });

  $("a").on("click", function(e) {
    e.preventDefault();
    $("#accordion").slideToggle();
  });

  $(document).off("keypress").on("keypress", function(e) {
    if(e.which !== char_code) {
      return;
    }

    $("a").trigger("click");
  });
})