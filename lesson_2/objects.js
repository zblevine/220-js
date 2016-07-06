var invoices = {
  unpaid: [],
  paid: [],
  add: function(client_name, amt) {
    var to_add = {
      name: client_name,
      amount: amt
    };

    this.unpaid.push(to_add);
  },
  calcTotal: function(arr) {
    var tot = 0;
    for(var i = 0; i < arr.length; i++) {
      tot += arr[i].amount;
    }

    return tot;
  },
  totalDue: function() {
    return this.calcTotal(this.unpaid);
  },
  payInvoice: function(name) {
    var new_unpaid = [];
    for(var i in this.unpaid) {
      if(this.unpaid[i].name === name) {
        this.paid.push(this.unpaid[i]);
      } else {
        new_unpaid.push(this.unpaid[i]);
      }
    }

    this.unpaid = new_unpaid;
  },
  totalPaid: function() {
    return this.calcTotal(this.paid);
  }
};

invoices.add("Starbucks", 300);
invoices.add("Donald Trump", 100000);
invoices.add("Mom", 1);
invoices.payInvoice("Mom");
console.log(invoices);
console.log(invoices.totalDue());
console.log(invoices.totalPaid());
