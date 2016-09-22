$(function() {
  var app = {
    getNumFromStr: function(tab_str) {
      return tab_str.match(/\d/)[0];
    },
    tabClickEvent: function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget),
          tab_str = $target.html(),
          tab_num = this.getNumFromStr(tab_str);

      this.setNewActive(tab_num);
    },
    colorChangeEvent: function(e) {
      var $target = $(e.currentTarget),
          new_color = $target.val();

      $("body").css("background-color", new_color);
      localStorage.setItem("color", new_color);
    },
    setNewActive: function(num) {
      localStorage.setItem("active_tab", num);
      paragraph_str = "#para-" + num;
      $(paragraph_str).prependTo("#paragraphs");
      $(".active").removeClass();
      $("li").eq(num - 1).find("a").addClass("active");
    },
    holdText: function() {
      localStorage.setItem("text_box", $("textarea").val());
    },
    bindEvents: function() {
      $("nav a").on("click", $.proxy(this.tabClickEvent, this));
      $("input[type='radio']").on("click", $.proxy(this.colorChangeEvent, this));
      $(window).on("unload", $.proxy(this.holdText, this));
    },
    init: function() {
      this.bindEvents();

      var active_tab = localStorage.getItem("active_tab") || 1,
          color = localStorage.getItem("color"),
          text_box = localStorage.getItem("text_box");
      this.setNewActive(active_tab);
      if(color) {
        $("body").css("background-color", color);
        $("input[type='radio']").filter(function() {
          return $(this).val() === color;
        }).attr("checked", true);
      }
      $("textarea").val(text_box);
    }
  }

  app.init();
});