$(function() {
  var $add = $("#add");
  var inventory = {
    setDate: function() {
      $("#curr_date").text(new Date().toUTCString());
    },
    cacheTemplate: function() {
      var $template = $("script[type='text/template']");
      this.template = $template.text();
      $template.remove();
    },
    add: function() {
      this.last_id += 1;
      var item = {
        id: this.last_id,
        name: "",
        stock_number: "",
        quantity: 1
      }

      this.collection.push(item);
      return item;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));

      $("#inventory_tbl").append($item);
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $tr = this.findParent(e),
          tr_id = this.findId($tr);
      $tr.remove();
      this.remove(tr_id);
    },
    updateItem: function(e) {
      e.preventDefault();
      var $tr = this.findParent(e),
          tr_id = this.findId($tr),
          item = this.get(tr_id);

      item.name = $tr.find("#item_name_id").val();
      item.stock_number = $tr.find("#item_stock_number_id").val();
      item.quantity = $tr.find("#item_quantity_id").val();
    },
    remove: function(id) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== id;
      });
    },
    get: function(id) {
      return this.collection.find(function(item) {
        return item.id === id;
      });
    },
    bindEvents: function() {
      $("#add").on("click", $.proxy(this.newItem, this));
      $("#inventory_tbl").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("#inventory_tbl").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    findId: function(obj) {
      return parseInt(obj.find("input[type='hidden']").val());
    },
    findParent: function(ele) {
      return $(ele.currentTarget).parents("tr");
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.last_id = 0;
      this.collection = [];
      this.bindEvents();
    }
  };

  inventory.init();
});