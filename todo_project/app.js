$(function() {
  var todo_template = Handlebars.compile($("#todo_template").html()),
      no_date_template = Handlebars.compile($("#no_date_template").html());
      list_template = Handlebars.compile($("#list_template").html());
      comp_list_template = Handlebars.compile($("#comp_list_template").html());

  var days = ["Day", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months = {
        Month: "Month",
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12"
      },
      years = ["Year", 2016, 2017, 2018, 2019, 2020];

  var app = {
    findKey: function(obj, val) {
      var keys = Object.keys(obj);
      for(var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if(obj[key] === val) {
          return key;
        }
      }
    },
    deleteTodo: function(e) {
      var $to_del = $(e.currentTarget).parent(),
          idx = $("#todo_list tbody tr").index($to_del),
          todos_str = localStorage.getItem("todos"),
          todos = JSON.parse(todos_str);

      todos.splice(idx, 1);
      $(".total_count").html(todos.length);
      localStorage.setItem("todos", JSON.stringify(todos));
      $to_del.remove();
      $(".comp_count").html($("#todo_list .done").length);

      this.resetMonthLists();
    },
    pullUpModal: function(e) {
      $(".modal").show();
      $(".modal").removeClass("alter");
    },
    pullUpModalAlter: function(e) {
      e.preventDefault();
      $(".modal").show()
      $(".modal").addClass("alter");
      
      var $curr_row = $(e.currentTarget).parent().parent();
      $curr_row.addClass("alter_todo");

      var idx = $("#todo_list tbody tr").index($(".alter_todo")),
          todo = JSON.parse(localStorage.getItem("todos"))[idx];

      $("#title").val(todo["title"]);
      $("#month").val(this.findKey(months, todo["month"]));
      $("#year").val("20" + todo["year"]);
      $("#day").val(todo["day"]);
      $("#desc").val(todo["desc"]);
    },
    closeModal: function(e) {
      e.preventDefault();
      $(".modal").hide();
      $(".alter_todo").removeClass(".alter_todo");
      $("form")[0].reset();
    },
    bindEvents: function() {
      $("#todo_list tbody").on("click", "td:last-child", $.proxy(this.deleteTodo, this));
      $(".new_todo").on("click", $.proxy(this.pullUpModal, this));
      $(".modal a").on("click", $.proxy(this.closeModal, this));
      $(".save_btn").on("click", $.proxy(this.saveButtonEvent, this));
      $("#todo_list tbody").on("click", "a", $.proxy(this.pullUpModalAlter, this));
      $(".complete_btn").on("click", $.proxy(this.completeButtonEvent, this));
      $("#table1 tr:first-child").on("click", $.proxy(this.allTodosEvent, this));
      $(".date_list").on("click", $.proxy(this.filterDateEvent, this));
      $("#table2 tr:first-child").on("click", $.proxy(this.filterCompletedEvent, this));
      $(".date_comp_list").on("click", $.proxy(this.filterDateAndCompleted, this));
    },
    addTodo: function(title, month, day, year, desc) {
      var todo = {
        title: title,
        month: month,
        day: day,
        year: year,
        desc: desc,
        done: false
      };

      var todos_str = localStorage.getItem("todos"),
          todos = JSON.parse(todos_str);

      todos.unshift(todo)
      $(".total_count").html(todos.length);
      localStorage.setItem("todos", JSON.stringify(todos));

      if(todo.month === "Month" || todo.year === "Year") {
        $("#todo_list tbody").prepend(no_date_template(todo));
      } else {
        $("#todo_list tbody").prepend(todo_template(todo));
      }

      this.resetMonthLists();
    },
    saveButtonEvent: function(e) {
      e.preventDefault();
      var title = $("#title").val(),
          month = months[$("#month").val()],
          day = $("#day").val(),
          year = $("#year").val().substring(2),
          desc = $("#desc").val();

      if($(".modal").hasClass("alter")) {
        var idx = $("#todo_list tbody tr").index($(".alter_todo"));
        this.alterTodo(idx, title, month, day, year, desc);
        $(".alter_todo td:first-child a").html(title + " - <span class='due_date'>" + month + "/" + year + "</span>");
      } else {
        this.addTodo(title, month, day, year, desc);
      }
      $(".alter_todo").removeClass(".alter_todo");
      $(".modal").hide();
      $("form")[0].reset();
      this.resetMonthLists();
    },
    alterTodo: function(idx, title, month, day, year, desc) {
      var todos_str = localStorage.getItem("todos"),
          todos = JSON.parse(todos_str);

      todos[idx].title = title;
      todos[idx].month = month;
      todos[idx].day = day;
      todos[idx].year = year;
      todos[idx].desc = desc;

      localStorage.setItem("todos", JSON.stringify(todos));
    },
    completeButtonEvent: function(e) {
      $(".modal").hide();
      $("form")[0].reset();
      if($(".modal").hasClass("alter")) {
        $(".alter_todo td:first-child").toggleClass("done");
        var idx = $("#todo_list tbody tr").index($(".alter_todo"));
        $(".alter_todo").removeClass("alter_todo");
        this.toggleComplete(idx);
      } else {
        alert("Todo doesn't exist yet!");
      }
    },
    filterDateEvent: function(e) {
      $(".highlight").removeClass("highlight");
      $(e.currentTarget).addClass("highlight");

      var date_str = $(e.currentTarget).find("td").first().html();
      var cir_num = $(e.currentTarget).find(".circle").html();

      $("#list-head h2").html(date_str);
      $("#list-head .circle").html(cir_num);

      $("#todo_list tbody tr").hide();
      $("#todo_list tbody tr").filter(function(index) {
        return $(this).find(".due_date").html() === date_str;
      }).show();
    },
    filterCompletedEvent: function(e) {
      $(".highlight").removeClass("highlight");
      $(e.currentTarget).addClass("highlight");

      $("#list-head h2").html("Completed");
      $("#list-head .circle").html($(".comp_count").html());

      $("#todo_list tbody tr").hide();
      $("#todo_list tbody tr").filter(function(index) {
        return $(this).find(".done").length > 0;
      }).show();
    },
    filterDateAndCompleted: function(e) {
      $(".highlight").removeClass("highlight");
      $(e.currentTarget).addClass("highlight");

      var date_str = $(e.currentTarget).find("td").first().html();
      var cir_num = $(e.currentTarget).find(".circle").html();

      $("#list-head h2").html(date_str);
      $("#list-head .circle").html(cir_num);

      $("#todo_list tbody tr").hide();
      $("#todo_list tbody tr").filter(function(index) {
        return $(this).find(".due_date").html() === date_str && $(this).find(".done").length > 0;
      }).show();
    },
    allTodosEvent: function(e) {
      $(".highlight").removeClass("highlight");
      $(e.currentTarget).addClass("highlight");

      $("#list-head h2").html("All Todos");
      $("#list-head .circle").html($(".total_count").html());

      $("#todo_list tbody tr").show();
    },
    toggleComplete: function(idx) {
      var todos_str = localStorage.getItem("todos"),
          todos = JSON.parse(todos_str);

      todos[idx].done = !(todos[idx].done);
      this.moveTodo(idx, todos[idx].done, todos);

      localStorage.setItem("todos", JSON.stringify(todos));
      $(".comp_count").html($("#todo_list .done").length);

      this.resetMonthLists();
    },
    moveTodo: function(idx, bool, todos) {
      var $todo_row = $("#todo_list tbody tr").eq(idx),
          todo = todos[idx]

      todos.splice(idx, 1);

      if(bool) {
        todos.push(todo);
        $("#todo_list tbody").append($todo_row);
      } else {
        todos.unshift(todo);
        $("#todo_list tbody").prepend($todo_row);
      }
    },
    addSelectOptions: function() {
      days.forEach(function(day) {
        $("#day").append("<option>" + day + "</option>");
      });
      Object.keys(months).forEach(function(month) {
        $("#month").append("<option>" + month + "</option>");
      });
      years.forEach(function(year) {
        $("#year").append("<option>" + year + "</option>");
      });
    },
    resetMonthLists: function() {
      var todos_by_date = {},
          completed_by_date = {};
          
      $.makeArray($("#todo_list tbody tr")).forEach(function(todo) {
        var due_date = $(todo).find(".due_date").html();
        todos_by_date[due_date] = (todos_by_date[due_date] || 0) + 1;
        if($(todo).children().first().hasClass("done")) {
          completed_by_date[due_date] = (completed_by_date[due_date] || 0) + 1;
        }
      });

      $(".date_list").remove();
      $(".date_comp_list").remove();

      $.each(todos_by_date, function(date, amount) {
        var params = {
          date: date,
          amount: amount
        };

        $("#table1").append(list_template(params));
      });

      $.each(completed_by_date, function(date, amount) {
        var params = {
          date: date,
          amount: amount
        };

        $("#table2").append(comp_list_template(params));
      });

      $(".date_list").on("click", $.proxy(this.filterDateEvent, this));
      $(".date_comp_list").on("click", $.proxy(this.filterDateAndCompleted, this));
    },
    init: function() {
      var todos_by_date = {};
      var completed_by_date = {};
      var todos = localStorage.getItem("todos");
      if(!todos) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        JSON.parse(todos).forEach(function(todo) {
          if(todo.month === "Month" || todo.year === "Year") {
            $("#todo_list tbody").append(no_date_template(todo));
          } else {
            $("#todo_list tbody").append(todo_template(todo));
          }

          var due_date = $(".due_date").last().html();
          todos_by_date[due_date] = (todos_by_date[due_date] || 0) + 1;
          if(todo.done) {
            $("#todo_list tbody tr:last-child td:first-child").addClass("done");
            completed_by_date[due_date] = (completed_by_date[due_date] || 0) + 1;
          }
        });
      }

      $.each(todos_by_date, function(date, amount) {
        var params = {
          date: date,
          amount: amount
        };

        $("#table1").append(list_template(params));
      });

      $.each(completed_by_date, function(date, amount) {
        var params = {
          date: date,
          amount: amount
        };

        $("#table2").append(comp_list_template(params));
      });

      this.bindEvents();
      this.addSelectOptions();
      $(".total_count").html(JSON.parse(todos).length);
      $(".comp_count").html($("#todo_list .done").length);
    }
  }

  app.init();
});