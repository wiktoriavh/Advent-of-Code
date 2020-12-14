"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var para = document.getElementById("text");
var overlay = document.getElementById("overlay");
var myData = "";

function fetchData(path, callback) {
  var fetchPromise, res, status, text;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fetchPromise = fetch(path);
          _context.next = 3;
          return regeneratorRuntime.awrap(fetchPromise);

        case 3:
          res = _context.sent;
          status = res.status;

          if (!(status < 200 || status >= 300)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", error(status));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(res.text());

        case 9:
          text = _context.sent;
          // useData(null, text);
          day09(text);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchData("./Inputs/09-data.txt");

function day01(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  var dataArr = data.split(/\n/g);
  dataArr.forEach(function (el, i) {
    dataArr.forEach(function (item, x) {
      if (i !== x) {
        var sum = Number(el) + Number(item); // console.log(sum)

        if (sum === 2020) {
          var mult = Number(el) * Number(item);
          console.log(mult);
        }
      }

      dataArr.forEach(function (a, b) {
        if (i !== x && i !== b && x !== b) {
          var secondSum = Number(el) + Number(item) + Number(a);

          if (secondSum === 2020) {
            var secondMult = Number(el) * Number(item) * Number(a);
            console.log(secondMult);
          }
        }
      });
    });
  });
}

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

    for (var i = 0; i < charRule.length; i++) {
      checkPassword(firstNum[i], lastNum[i], charRule[i], pswd[i]);
    }

    console.log(valid);
    console.log(validTwo); // para.innerHTML = lastNum;
  }
}

var valid = 0;
var validTwo = 0;

function checkPassword(from, to, check, password) {
  var re = new RegExp(check, "g");
  var count = (password.match(re) || []).length;

  if (count >= from && count <= to) {
    valid++;
  }

  if (password.charAt(from - 1) === check && password.charAt(to - 1) !== check) {
    validTwo++;
  } else if (password.charAt(from - 1) !== check && password.charAt(to - 1) === check) {
    validTwo++;
  }
}

function day03(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  para.innerHTML = data;
  var slopeArr = data.split(/\n/);
  var moves = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  var multiTrees = 1;
  moves.forEach(function (el) {
    var count = checkSlope(slopeArr, el[0], el[1]);
    console.log(count);
    multiTrees *= count;
  });
  console.log(multiTrees);
}

function checkSlope(arr, step, skip) {
  var counter = 0;
  var right = 0;
  var row = 31;
  arr.forEach(function (el, i) {
    if (skip === 1) {
      var check = el.charAt(right);

      if (check === "#") {
        counter++;
      }

      right += step;

      if (right >= row) {
        right -= row;
      }
    } else if (i % 2 === 0) {
      var _check = el.charAt(right);

      if (_check === "#") {
        counter++;
      }

      right += step;

      if (right >= row) {
        right -= row;
      }
    }
  });
  return counter;
}

function day04(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  var batch = data.split(/\n{2}/g);
  var processingBatch = [];
  var passports = [];
  batch.forEach(function (el) {
    processingBatch.push(el.split(/\n/g));
  });
  processingBatch.forEach(function (el) {
    var a;
    a = el.join(" ");
    var arr = a.split(" ");
    passports.push(arr);
  });
  var passObj = [];
  passports.forEach(function (passport, x) {
    var parts = {};
    passport.forEach(function (el, i) {
      var match = el.match(/([a-z]{3})(:)(.+)/);
      parts[match[1]] = match[3];
    });
    passObj.push(parts);
  });
  var props = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  var valid = 0;
  passObj.forEach(function (el, i) {
    var reqProp = 7;
    var hasProps = 7;
    var validValues = true;
    props.forEach(function (prop) {
      var checkProp = el.hasOwnProperty(prop);

      if (checkProp == false) {
        hasProps--;
      }
    });

    if (hasProps === reqProp) {
      var byr = el[props[0]];
      var iyr = el[props[1]];
      var eyr = el[props[2]];
      var hgt = el[props[3]];
      var hcl = el[props[4]];
      var ecl = el[props[5]];
      var pid = el[props[6]];

      if (!(byr >= 1920 && byr <= 2002)) {
        return validValues = false;
      }

      if (!(iyr >= 2010 && iyr <= 2020)) {
        return validValues = false;
      }

      if (!(eyr >= 2020 && eyr <= 2030)) {
        return validValues = false;
      }

      if (hgt.match(/cm/)) {
        var height = hgt.match(/\d+/)[0];

        if (!(height >= 150 && height <= 193)) {
          return validValues = false;
        }
      } else if (hgt.match(/in/)) {
        var _height = hgt.match(/\d+/)[0];

        if (!(_height >= 59 && _height <= 76)) {
          return validValues = false;
        }
      }

      if (!hcl.match(/#\w{6}/)) {
        return validValues = false;
      }

      var eyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      var matchEye = false;
      eyes.forEach(function (eye) {
        if (eye === ecl) {
          matchEye = true;
        }
      });

      if (matchEye === false) {
        return validValues = false;
      }

      if (!pid.match(/\d{9}/)) {
        return validValues = false;
      }
    }

    if (validValues === true) {
      valid++;
    }
  });
  console.log(valid);
}

function day05(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  var seats = data.split(/\n/);
  var binSeats = [];
  seats.forEach(function (seat) {
    var newSeat = "";
    seat.split("").forEach(function (letter) {
      var dec = letter.replace(/(F)|(B)|(L)|(R)/g, replacer);
      newSeat += dec;
    });
    binSeats.push(newSeat);
  });
  var seatObj = [];
  binSeats.forEach(function (seat) {
    seat.replace(/(\d{7})(\d{3})/, function (m, row, seat) {
      var obj = {
        "row": row,
        "seat": seat
      };
      seatObj.push(obj);
    });
  });
  var seatNums = [];
  seatObj.forEach(function (obj) {
    var _int = {
      "row": parseInt(obj.row, 2),
      "seat": parseInt(obj.seat, 2)
    };
    seatNums.push(_int);
  });
  var seatIDs = [];
  seatNums.forEach(function (seat) {
    var row = seat.row;
    var chair = seat.seat;
    var id = row * 8 + chair;
    seatIDs.push(id);
  });
  seatIDs.sort(function (a, b) {
    return b - a;
  });
  var topSeat = seatIDs[0];
  var lastSeat = seatIDs[seatIDs.length - 1];
  seatIDs.forEach(function (id) {
    var check = seatIDs.includes(id - 1); // console.log(check)

    if (!check) {
      var mySeat = id - 1;
      var myNeighbourUp = seatIDs.includes(mySeat - 1);
      var myNeighbourDown = seatIDs.includes(mySeat + 1);

      if (myNeighbourUp && myNeighbourDown) {
        console.log(mySeat);
      }
    }
  });
}

function checkSeat(match, row, seat) {
  var obj = {
    "row": row,
    "seat": seat
  }; // console.log(match)

  return obj;
}

function replacer(match, p1, p2, p3, p4) {
  var _char = p1 || p2 || p3 || p4;

  switch (_char) {
    case "F":
      return 0;

    case "B":
      return 1;

    case "L":
      return 0;

    case "R":
      return 1;
  }
}

function day06(error, data) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }

  var groups = data.split(/\n\n/);
  var groupArr = [];
  var strGroup = [];
  var countArr = [];
  var groupYes = [];
  var wholeYes = 0;
  var everyoneYes = 0;
  groups.forEach(function (group) {
    groupArr.push(group.split(/\n/));
  });
  groupArr.forEach(function (group) {
    var str = group.join("");
    strGroup.push(str);
  });
  strGroup.forEach(function (str) {
    var smth = charTally(str);
    countArr.push(smth);
  });
  countArr.forEach(function (obj, i) {
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    var num = keys.length;
    var len = groupArr[i].length;
    wholeYes += num;
    var counter = 0;
    keys.forEach(function (key) {
      if (obj[key] === len) {
        everyoneYes++;
      }
    });
  });
  console.log(wholeYes); // answer for part one

  console.log(everyoneYes); // answer for part two
}

function charTally(input) {
  return input.split('').reduce(function (acc, _char2) {
    acc[_char2] = (acc[_char2] || 0) + 1;
    return acc;
  }, {});
}

function error(error) {
  if (error !== null) {
    return console.error("Etwas ist schief gelaufen: " + error);
  }
}

function day07(data) {
  var sentences = data.split(/\n/);
  var rules = [];
  sentences.forEach(function (sentence, i) {
    var regex = new RegExp(/([0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9A-Z_a-z\u017F\u212A]+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]bag[s\u017F] contain[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:(?:(?:([0-9])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9A-Z_a-z\u017F\u212A]+))[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:bag[s\u017F]|bag)(?:,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:([0-9])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9A-Z_a-z\u017F\u212A]+))[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:bag[s\u017F]|bag))?(?:,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:([0-9])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9A-Z_a-z\u017F\u212A]+))[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:bag[s\u017F]|bag))?(?:,[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:([0-9])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]([0-9A-Z_a-z\u017F\u212A]+[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF][0-9A-Z_a-z\u017F\u212A]+))[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF](?:bag[s\u017F]|bag))?)?|(no other bag[s\u017F])?)\./gi);
    var arr = {};
    var matches = sentence.matchAll(regex);
    var match, bag, num1, bag1, num2, bag2, num3, bag3, num4, bag5, noBags;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 11);

        match = _step$value[0];
        bag = _step$value[1];
        num1 = _step$value[2];
        bag1 = _step$value[3];
        num2 = _step$value[4];
        bag2 = _step$value[5];
        num3 = _step$value[6];
        bag3 = _step$value[7];
        num4 = _step$value[8];
        bag5 = _step$value[9];
        noBags = _step$value[10];
        var bagArr = [bag1, bag2, bag3, bag5];
        var numArr = [num1, num2, num3, num4];
        var obj = {};

        if (noBags) {
          arr[bag] = obj;
        } else {
          for (var x = 0; x < bagArr.length; x++) {
            if (bagArr[x] !== undefined) {
              var aBag = bagArr[x];
              var aNum = Number(numArr[x]);
              obj[aBag] = aNum;
            }

            arr[bag] = obj;
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    rules.push(arr);
  });
  var firstLevel = [];
  var secondLevel = [];
  rules.forEach(function (rule) {
    var key = Object.keys(rule);
    var bags = rule[key];
    var bagKey = Object.keys(bags);
    iterate(bagKey, key);
  }); // console.log(topBags);
}

var topBags = 0;

function iterate(input, key) {
  var level = [];

  var arr = _toConsumableArray(input); // console.log(arr)


  arr.forEach(function (bag) {
    if (bag === "shiny gold") {
      level.push(key[0]);
      topBags++;
    }
  });
  var check = level.length;

  if (check !== 0) {
    level.forEach(function (part) {
      iterate(part);
    });
  }
}

var index = 0;
var accumulator = 0;

function day08(input) {
  var data = input.split(/\n/);
  var regex = /(jmp|acc|nop)\s(\-|\+)(\d+)/g;
  var jmpNopIndexes = [];
  var visitedIndex = [];

  if (index === data.length - 1) {
    console.log("Party Two: " + accumulator);
  }

  while (index < data.length) {
    var instruction = data[index];
    var matches = instruction.matchAll(regex);

    if (visitedIndex.includes(index)) {
      return;
    }

    visitedIndex.push(index);
    var match = void 0,
        action = void 0,
        symbol = void 0,
        amount = void 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = matches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 4);

        match = _step2$value[0];
        action = _step2$value[1];
        symbol = _step2$value[2];
        amount = _step2$value[3];
        var num = Number(amount);

        switch (action) {
          case "jmp":
            if (symbol === "+") {
              index += num;
            } else {
              index -= num;
            }

            ;
            break;

          case "nop":
            index++;
            break;

          case "acc":
            if (symbol === "+") {
              accumulator += num;
            } else {
              accumulator -= num;
            }

            ;
            index++;
            break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  console.log(accumulator);
}

function findJmpNop(matches) {
  var match, action, symbol, amount;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = matches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 4);

      match = _step3$value[0];
      action = _step3$value[1];
      symbol = _step3$value[2];
      amount = _step3$value[3];

      if (action === "jmp") {
        console.log(action);
      } else if (action === "nop") {
        console.log(action);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function replaceJmpNop(input) {
  console.log("ICH BIN REPLACEJMPNOP");
}

function day09(input) {
  var data = input.split(/\n/).map(function (y) {
    return Number(y);
  });
  var previous25 = [];
  var target = 0;
  data.forEach(function (el, i) {
    if (previous25.length !== 25) {
      return previous25.push(el);
    }

    var sums = [];
    previous25.forEach(function (prev1, j) {
      previous25.forEach(function (prev2, x) {
        if (j === x) {
          return;
        }

        var sum = Number(prev1) + Number(prev2);
        sums.push(sum);
      });
    });
    var includes = sums.includes(Number(el));

    if (!includes) {
      target = Number(el);
      console.log(target);
    }

    previous25.shift(1);
    previous25.push(el);
  });
  var cusums = [0];

  for (var n in data) {
    var lastEntry = cusums[cusums.length - 1];
    cusums.push(lastEntry + data[n]);
  }

  var a = 0;
  var b = 1;
  var bool = true;

  while (bool) {
    var partsum = cusums[b] - cusums[a];

    if (partsum < target) {
      b++;
    } else if (partsum > target) {
      a++;
    } else {
      bool = false;
    }
  }

  var subsequence = data.slice(a, b + 1);
  var answer = Math.min.apply(Math, _toConsumableArray(subsequence)) + Math.max.apply(Math, _toConsumableArray(subsequence));
  console.log(answer);
}