"use strict";

var _Fetch = _interopRequireDefault(require("/Fetch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _Fetch["default"])("./Inputs/11-data.txt", day11);

function day11(input) {
  var rows = input.split(/\n/);
  var seats = [];
  var empty = "L";
  var floor = ".";
  var occupied = "#";
  rows.forEach(function (row) {
    seats.push(row.split(""));
  });
  var prev = seats;
  var next = [];
  var boolArrs = arrayEquals(prev, next);
  console.log(mapArr(prev));

  if (boolArrs === true) {
    return console.log("The same: " + next);
  }
}

function arrayEquals(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every(function (val, index) {
    return val === b[index];
  });
}

function mapArr(arr) {
  arr.forEach(function (row, i, array) {
    row.map(function (seat, j) {
      var curRow = i;
      var curSeat = j;
      var topRow = i - 1;
      var bottomRow = i + 1;
      var rows = [curRow, topRow, bottomRow];
      var leftSeat = j - 1;
      var rightSeat = j + 1;
      var seats = [curSeat, leftSeat, rightSeat];
      var adjacent = [];
      rows.forEach(function (el) {
        seats.forEach(function (ol) {
          if (array[el][ol] !== undefined) {
            adjacent.push(array[el][ol]);
          }
        });
      });
      console.log(adjacent);

      if (seat === "L") {}
    });
  });
}