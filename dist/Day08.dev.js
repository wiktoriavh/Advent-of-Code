"use strict";

var _Fetch2 = _interopRequireDefault(require("./Fetch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Day08 =
/*#__PURE__*/
function (_Fetch) {
  _inherits(Day08, _Fetch);

  function Day08(path) {
    var _this;

    _classCallCheck(this, Day08);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Day08).call(this));
    _this.path = path;
    return _this;
  }

  _createClass(Day08, [{
    key: "init",
    value: function init() {
      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.fetchData(this.path));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "day08",
    value: function day08() {
      var data = this.data.split(/\n/);
      var regex = /(jmp|acc|nop)\s(\-|\+)(\d+)/g;
      var accumulator = 0;
      var visitedIndex = [];
      var visitedRules = [];
      var index = 0;

      while (index < data.length) {
        // console.log(index);
        var instruction = data[index];
        var matches = instruction.matchAll(regex);

        if (visitedIndex.includes(index)) {
          console.log("acc: " + accumulator);
          return;
        }

        visitedIndex.push(index);
        this.forLoopMatches(matches, accumulator, index);
      }

      console.log("visited: " + visitedIndex);
    }
  }, {
    key: "forLoopMatches",
    value: function forLoopMatches(matches, acc, index) {
      var accu = acc;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 4),
              match = _step$value[0],
              action = _step$value[1],
              symbol = _step$value[2],
              amount = _step$value[3];

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
                accu += num;
              } else {
                accu -= num;
              }

              ;
              index++;
              break;
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
    }
  }]);

  return Day08;
}(_Fetch2["default"]);

var day = new Day08("./Inputs/08-data.txt");
day.init().then(function () {
  day.day08();
});