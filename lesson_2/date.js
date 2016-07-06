var today = new Date();
var tomorrow = new Date(today);
var next_week = new Date(today);

function formattedDay(date) {
  var days_of_week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days_of_week[date.getDay()];
}

function formattedMonth(date) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return months[date.getMonth()];
}

function addFrontZero(n) {
  if(n < 10) {
    n = "0" + n;
  }

  return n;
}

function formattedTime(date) {
  return addFrontZero(date.getHours()) + ":" + addFrontZero(date.getMinutes());
}

function dateSuffix(n) {
  var suffix = "th";

  if (n === 11 || n === 12 || n === 13) {
    ;
  } else if (n % 10 === 1) {
    suffix = "st";
  } else if (n % 10 === 2) {
    suffix = "nd";
  } else if (n % 10 === 3) {
    suffix = "rd";
  }

  return suffix;
}

function dateString(date) {
  var n = date.getDate();

  return "Today's date is " + formattedDay(date) + ", " +
    formattedMonth(date) + " " + n + dateSuffix(n);
}

tomorrow.setDate(22);

console.log(dateString(today));
console.log(dateString(tomorrow));

console.log(today === next_week);
console.log(today.toString() === next_week.toString());
next_week.setDate(28);
console.log(today.toString() === next_week.toString());

console.log(formattedTime(today));



