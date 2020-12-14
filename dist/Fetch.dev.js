"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
          callback(text);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _default = fetchData;
exports["default"] = _default;