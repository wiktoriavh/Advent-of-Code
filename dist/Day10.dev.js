"use strict";

var _Fetch = _interopRequireDefault(require("/Fetch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _Fetch["default"])("./Inputs/10-data.txt", day10);

function day10(input) {
  var data = input.split(/\n/).map(function (n) {
    return Number(n);
  });
  var sortedData = [0].concat(_toConsumableArray(data.sort(function (a, b) {
    return a - b;
  }))); // Add the socket of 0 to the front and spread the data array into the new array, sorted ascending

  var lastNum = sortedData[sortedData.length - 1];
  sortedData.push(lastNum + 3); // add the device of n+3 at the end of the array

  console.log("Part One: " + partOne(sortedData));
  console.log("Part Two: " + partTwo(sortedData));
}

function partOne(arr) {
  var oneJolt = 0;
  var twoJolts = 0;
  var threeJolts = 0;

  for (var n = 0; n < arr.length; n++) {
    var sub = arr[n + 1] - arr[n];

    switch (sub) {
      case 1:
        oneJolt++;
        break;

      case 2:
        twoJolts++;
        break;

      case 3:
        threeJolts++;
        break;
    }
  }

  return oneJolt * threeJolts;
}

function partTwo(arr) {
  var options = {};
  arr.forEach(function (e) {
    var toConnect1 = e + 1;
    var toConnect2 = e + 2;
    var toConnect3 = e + 3;
    options[e] = [[], 0];
    arr.forEach(function (element) {
      switch (element) {
        case toConnect1:
          options[e][0].push(toConnect1);
          break;

        case toConnect2:
          options[e][0].push(toConnect2);
          break;

        case toConnect3:
          options[e][0].push(toConnect3);
          break;
      }
    });
  });
  console.log(options);
  arr.sort(function (a, b) {
    return b - a;
  }); // console.log(options)

  var first = false;
  arr.forEach(function (e) {
    if (first === false) {
      first = true;
      options[e][1]++;
    } else {
      var sum = 0;
      options[e][0].forEach(function (op) {
        sum += options[op][1];
      });
      options[e][1] = sum;
    }

    ;
  });
  console.log(options);
}