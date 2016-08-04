$(function() {
  var cats = [],
      data = [{
        "title": "The Legend of Zelda: Majora's Mask 3D",
        "id": 1,
        "category": "Nintendo 3DS"
      }, {
        "title": "Super Smash Bros.",
        "id": 2,
        "category": "Nintendo 3DS"
      }, {
        "title": "Super Smash Bros.",
        "id": 3,
        "category": "Nintendo WiiU"
      }, {
        "title": "LEGO Batman 3: Beyond Gotham",
        "id": 4,
        "category": "Nintendo WiiU"
      }, {
        "title": "LEGO Batman 3: Beyond Gotham",
        "id": 5,
        "category": "Xbox One"
      }, {
        "title": "LEGO Batman 3: Beyond Gotham",
        "id": 6,
        "category": "PlayStation 4"
      }, {
        "title": "Far Cry 4",
        "id": 7,
        "category": "PlayStation 4"
      }, {
        "title": "Far Cry 4",
        "id": 8,
        "category": "Xbox One"
      }, {
        "title": "Call of Duty: Advanced Warfare",
        "id": 9,
        "category": "PlayStation 4"
      }, {
        "title": "Call of Duty: Advanced Warfare",
        "id": 10,
        "category": "Xbox One"
      }];

  $.each(data, function(i, obj) {
    function formatString(ob) {
      return "<li data-id='" + ob["id"] + "'>" + ob["title"] + " for " + ob["category"] + "</li>";
    }

    $("#games ul").append(formatString(obj));
    if(!cats.includes(obj["categories"])) {
      cats.push(obj["categories"]);
    }
  });

  $("input:checkbox").change(function() {
    var cat = $(this).val();
    var ids_to_toggle = data.filter(function(obj) {
      return obj.category === cat;
    }).map(function(obj) {
      return obj.id;
    });

    $.each(ids_to_toggle, function(i, val) {
      $("#games li").filter(function() {
        return $(this).data("id") === val;
      }).toggle();
    });
  });
});