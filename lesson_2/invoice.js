function createInvoice(services) {
  // implement the factory function here
  return {
    phone: (services && (services.phone || 3000)) || 3000,
    internet: (services && (services.internet || 5500)) || 5500,
    total: function() {
      return this.phone + this.internet;
    },
    addPayment: function(payment) {
      if (payment.amount) {
        var amt = payment.amount;
        if (this.phone >= amt) {
          this.phone -= amt;
        } else {
          if (this.internet >= amt) {
            this.internet -= amt;
          } else {
            this.internet -= (amt - this.phone);
            this.phone = 0;
          }
        }
      } else {
        if(payment.phone) {
          if(this.phone >= payment.phone) {
            this.phone -= payment.phone;
          } else {
            this.internet -= (payment.phone - this.phone);
            this.phone = 0;
          }
        }
        if(payment.internet) {
          if(this.internet >= payment.internet) {
            this.internet -= payment.internet;
          } else {
            this.phone -= (payment.internet - this.internet);
            this.internet = 0;
          }
        }
      }
    },
    addPayments: function(payments) {
      for (var pm in payments) {
        this.addPayment(payments[pm]);
      }
    }
  }
}

function invoiceTotal(invoices) {
  var total = 0;
  for (var i = 0; i < invoices.length; i++) {
    total += invoices[i].total();
  }
  return total;
}

function createPayment(services) {
  // implement the factory function here
  var services = services || {}
  return {
    amount: services.amount,
    phone: services.phone || 0,
    internet: services.internet || 0,
    total: function() {
      return this.amount || (this.phone + this.internet);
    }
  }
}

function paymentTotal(payments) {
  var total = 0;
  for (var i = 0; i < payments.length; i++) {
    total += payments[i].total();
  }
  return total;
}

var payments = [];
payments.push(createPayment());
payments.push(createPayment({internet: 6500}));
payments.push(createPayment({phone: 2000}));
payments.push(createPayment({phone: 1000, internet: 4500}));
payments.push(createPayment({amount: 10000}));

console.log(paymentTotal(payments)); //should be 24000

var invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({ phone: 1000, internet: 4500 }));

console.log(invoiceTotal(invoices)); //should be 31000

var invoice = createInvoice({phone: 1200, internet: 4000});
var payment1 = createPayment({amount: 2000});
var payment2 = createPayment({phone: 1000, internet: 1200});
var payment3 = createPayment({phone: 1000});

invoice.addPayment(payment1)
invoice.addPayments([payment2, payment3]);
console.log(invoice.total());  