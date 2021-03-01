self["webpackHotUpdate"]("main",{

/***/ "./module/appTemplate/appTemplate.js":
/*!*******************************************!*\
  !*** ./module/appTemplate/appTemplate.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ appTemplate; }
/* harmony export */ });
/* harmony import */ var _showGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../showGrid */ "./module/showGrid.js");
/* harmony import */ var _modalTemplates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modalTemplates */ "./module/appTemplate/modalTemplates.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login */ "./module/login.js");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loader */ "./module/appTemplate/loader.js");
/* harmony import */ var _apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../apiUtils/apiUtils */ "./module/apiUtils/apiUtils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-unused-vars */





function appTemplate(selector) {
  var app = document.querySelector(selector);
  var template = "\n        <div class=\"modal__dialog-header-warning\" id=\"modal-warning\">\n          <span class=\"fas fa-exclamation-circle\"></span>\n          <span class=\"modal__dialog-header-warning-text\"></span>\n          <span class=\"modal__dialog-header-warning-close fas fa-times-circle\"></span>\n        </div>\n        <div class=\"controls\">\n          <h2 class=\"title\">Calendar</h2>\n          <div id=\"filter\"></div>\n          <button class=\"btn js-modal-open\" data-type=\"add-event\" data-modal=\"modal-event\">\n              <span>New event</span>\n              <span class=\"fas fa-plus\"></span>\n          </button>            \n        </div>\n        <div class=\"calendar-grid\">\n        </div>";
  var loader = (0,_loader__WEBPACK_IMPORTED_MODULE_3__.default)();
  document.body.append(loader);
  app.insertAdjacentHTML('beforeend', template);
  (0,_modalTemplates__WEBPACK_IMPORTED_MODULE_1__.default)();
  getList(loader, app);
}

function getList() {
  return _getList.apply(this, arguments);
}

function _getList() {
  _getList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var loader,
        app,
        userList,
        events,
        res,
        resEvents,
        data,
        _data,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loader = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
            app = _args.length > 1 ? _args[1] : undefined;

            if (loader) {
              loader.classList.add('active');
            }

            userList = [];
            events = [];
            _context.prev = 5;
            _context.next = 8;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_4__.getData)('users');

          case 8:
            res = _context.sent;
            _context.next = 11;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_4__.getData)('events');

          case 11:
            resEvents = _context.sent;

            if (!(res.status === 200)) {
              _context.next = 20;
              break;
            }

            _context.next = 15;
            return res.json();

          case 15:
            data = _context.sent;
            console.log(data);
            data.forEach(function (obj) {
              var parsedData = JSON.parse(obj.data);

              var item = _objectSpread({
                id: obj.id
              }, parsedData);

              userList.push(item);
            });
            _context.next = 21;
            break;

          case 20:
            throw new Error('Network status not 200');

          case 21:
            if (!(resEvents.status === 200)) {
              _context.next = 28;
              break;
            }

            _context.next = 24;
            return resEvents.json();

          case 24:
            _data = _context.sent;

            if (_data) {
              _data.forEach(function (obj) {
                var parsedData = JSON.parse(obj.data);

                var item = _objectSpread({
                  id: obj.id
                }, parsedData);

                events.push(item);
              });
            }

            _context.next = 29;
            break;

          case 28:
            throw new Error('Network status not 200');

          case 29:
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](5);
            console.warn(_context.t0);

          case 34:
            _context.prev = 34;

            if (loader) {
              loader.classList.remove('active');
            }

            app.classList.add('active');
            (0,_showGrid__WEBPACK_IMPORTED_MODULE_0__.default)();
            (0,_login__WEBPACK_IMPORTED_MODULE_2__.default)('login', userList, events);
            return _context.finish(34);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 31, 34, 40]]);
  }));
  return _getList.apply(this, arguments);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "2be40fc25b8afede19ee"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.6b7b0b408cdf10010fa1.hot-update.js.map