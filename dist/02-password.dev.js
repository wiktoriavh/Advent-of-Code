"use strict";

var para = document.getElementById("text");
var myData = "";
fetch('02-data.txt').then(function (response) {
  return response.text();
}).then(function (data) {// console.log("fetched");
});

function fetchData(path) {
  var res, status, text;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(path));

        case 2:
          res = _context.sent;
          status = res.status;

          if (status < 200 || status >= 300) {
            useData(status, res);
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(res.text());

        case 7:
          text = _context.sent;
          useData(null, text);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchData("02-data.txt");

function useData(error, data) {
  if (error !== null) {
    console.error("Etwas ist schief gelaufen: " + error);
  } else {
    /**
     * Array of the rules and passwords
     */
    var numRule = data.match(/(?:\d+-\d+)/gm).join().split(",");
    var charRule = data.match(/\b(?:[a-z])\b/gm).join().split(",");
    var pswd = data.match(/[a-z]{2,}/gm).join().split(",");
    var firstNum = data.match(/^\d+/gm).join().split(",");
    var lastNum = [];
    numRule.forEach(function (el) {
      var check = el.match(/\d+$/).join();
      lastNum.push(check);
    });
    para.innerHTML = lastNum;
  }
}

function checkPassword(from, to, check, password) {}