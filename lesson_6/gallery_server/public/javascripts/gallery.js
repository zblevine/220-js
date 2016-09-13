$(function() {
  var slideshow_tracker = (function() {
    var position = 0;
    return { 
      currPhotoId: function() {
        return position % 3 + 1;
      },
      addOne: function() {
        position += 1;
      },
      subtractOne: function() {
        if(position == 0) {
          position += 3;
        }
        position -= 1;
      }
    }
  })();


  var photo_template = Handlebars.compile($("#photo_template").html()),
      description_template = Handlebars.compile($("#description_template").html()),
      comment_template = Handlebars.compile($("#comment_template").html());

  var app = {
    is_init: false,
    loadPhoto: function(photo_id) {
      this.photoCall(photo_id);
      this.commentCall(photo_id);
    },
    photoCall: function(photo_id) {
      $.ajax({
        url: "http://localhost:3000/photos",
        type: "GET",
        dataType: "json",
        context: this,
        success: function(response) {
          var resp_body = response[photo_id - 1],
              curr_photo_template = photo_template(resp_body);
          if(this.is_init) {
            this.clearFigure();
            this.appendDescription(resp_body);
            this.fadeInFigure(curr_photo_template);
          } else {
            this.appendDescription(resp_body);
            $("#slides").append(curr_photo_template);
            this.is_init = true;
          }
        }
      });
    },
    appendDescription: function(resp_body) {
      $("#description").append(description_template(resp_body));
      $("#likes").on("click", $.proxy(this.addLike, this));
      $("#favorites").on("click", $.proxy(this.addFavorite, this));
    },
    commentCall: function(photo_id) {
      $.ajax({
        url: "http://localhost:3000/comments?photo_id=" + photo_id,
        type: "GET",
        dataType: "json",
        success: function(response) {
          response.forEach(function(comment_obj) {
            $("#comment_section").append(comment_template(comment_obj));
          });
        }
      });
    },
    addLike: function(e) {
      e.preventDefault();
      var curr_id = slideshow_tracker.currPhotoId();
      $.ajax({
        url: "http://localhost:3000/photos/like",
        type: "POST",
        dataType: "json",
        data: {photo_id: curr_id},
        success: function(response) {
          $("#likes").html("&#x2661; " + response['total'] + " Likes");
        }
      })
    },
    addFavorite: function(e) {
      e.preventDefault();
      var curr_id = slideshow_tracker.currPhotoId();
      $.ajax({
        url: "http://localhost:3000/photos/favorite",
        type: "POST",
        dataType: "json",
        data: {photo_id: curr_id},
        success: function(response) {
          $("#favorites").html("&#9734; " + response['total'] + " Favorites");
        }
      })
    },
    addComment: function(e) {
      e.preventDefault();
      var curr_id = slideshow_tracker.currPhotoId();
      var serialized = $(e.currentTarget).serializeArray();
      serialized.push({name: "photo_id", value: curr_id});
      $.ajax({
        url: "http://localhost:3000/comments/new",
        type: "POST",
        dataType: "json",
        data: serialized,
        success: function(response) {
          console.log(response);
          $("#comment_section").append(comment_template(response));
          $("form")[0].reset();
        }
      })
    },
    moveLeft: function(e) {
      e.preventDefault();
      slideshow_tracker.subtractOne();
      var curr_id = slideshow_tracker.currPhotoId();
      this.loadPhoto(curr_id);
    },
    moveRight: function(e) {
      e.preventDefault();
      slideshow_tracker.addOne();
      var curr_id = slideshow_tracker.currPhotoId();
      this.loadPhoto(curr_id);
    },
    clearFigure: function() {
      $("#description").empty();
      $(".comment").remove();
      $("#slides").filter("figure").fadeOut(300, function() {
        $(this).remove();
      });
    },
    fadeInFigure: function(fig_template) {
      $(fig_template).hide().appendTo("#slides").fadeIn(300);
    },
    bindEvents: function() {
      $(".prev").on("click", $.proxy(this.moveLeft, this));
      $(".next").on("click", $.proxy(this.moveRight, this));
      $("form").on("submit", $.proxy(this.addComment, this));
    },
    init: function() {
      this.bindEvents();
      this.loadPhoto(1);
    }
  }

  app.init();
});