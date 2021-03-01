self["webpackHotUpdate"]("main",{

/***/ "./module/removeEvent.js":
/*!*******************************!*\
  !*** ./module/removeEvent.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiUtils/apiUtils */ "./module/apiUtils/apiUtils.js");
/* harmony import */ var _auxiliary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auxiliary */ "./module/auxiliary.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var removeEvent = function removeEvent(events, eventSlot) {
  var eventSlotChildren = eventSlot.children;
  var eventIndex = events.findIndex(function (event) {
    return event.id === eventSlot.dataset.eventId;
  });
  events.splice(eventIndex, 1);
  eventSlot.removeAttribute('data-event-id');
  eventSlot.classList.remove(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.slotBooked);
  eventSlotChildren[0].textContent = '';
  eventSlotChildren[1].style.display = 'none';
  localStorage.eventStore = JSON.stringify(events);
}; // end removeEvent


/* harmony default export */ __webpack_exports__["default"] = (function (modalId, elem, events) {
  var popup = document.getElementById(modalId);
  popup.classList.add(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive);

  var closePopup = function closePopup() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive);
  };

  var clickHandler = function clickHandler(e) {
    var target = e.target;

    if (target.name === 'yes') {
      removeEventApi('events', events, elem);
      closePopup(clickHandler);
    }

    if (target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.triggerClose)) || target.classList.contains(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive)) {
      closePopup(clickHandler);
    }
  };

  popup.addEventListener('click', clickHandler);
});

function removeEventApi(_x, _x2, _x3) {
  return _removeEventApi.apply(this, arguments);
}

function _removeEventApi() {
  _removeEventApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(entityName, events, elem) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__.deleteData)(entityName, elem.dataset.eventId);

          case 3:
            res = _context.sent;
            console.log(res);

            if (res.status === 204) {
              removeEvent(events, elem);
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.warn(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _removeEventApi.apply(this, arguments);
}

/***/ }),

/***/ "./module/render.js":
/*!**************************!*\
  !*** ./module/render.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "resetGrid": function() { return /* binding */ resetGrid; },
/* harmony export */   "getEventStore": function() { return /* binding */ getEventStore; },
/* harmony export */   "getEventsFromApi": function() { return /* binding */ getEventsFromApi; }
/* harmony export */ });
/* harmony import */ var _apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiUtils/apiUtils */ "./module/apiUtils/apiUtils.js");
/* harmony import */ var _auxiliary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auxiliary */ "./module/auxiliary.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var render = function render(event) {
  document.querySelectorAll('.row-meeting').forEach(function (row) {
    if (event.time === row.dataset.time) {
      row.querySelectorAll('.meeting-cell').forEach(function (eventSlot) {
        if (eventSlot.dataset.day === event.day) {
          var eventSlotChildren = eventSlot.children;
          eventSlot.classList.add(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.slotBooked);
          eventSlot.classList.remove(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.triggerOpen);
          eventSlot.setAttribute('data-event-id', event.id);
          eventSlot.setAttribute('draggable', true);
          eventSlotChildren[0].textContent = event.name;
          eventSlotChildren[1].style.display = 'inline';
        }
      });
    }
  });
};
var resetGrid = function resetGrid() {
  document.querySelectorAll('.row-meeting').forEach(function (row) {
    row.querySelectorAll('.meeting-cell').forEach(function (eventSlot) {
      var eventSlotChildren = eventSlot.children;
      eventSlot.classList.remove(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.slotBooked);
      eventSlot.classList.add(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.triggerOpen);
      eventSlot.removeAttribute('data-event-id');
      eventSlot.removeAttribute('draggable', true);
      eventSlotChildren[0].textContent = '';
      eventSlotChildren[1].style.display = 'none';
    });
  });
};
var getEventStore = function getEventStore() {
  var eventStore = [];

  if (localStorage.getItem('eventStore')) {
    eventStore = JSON.parse(localStorage.getItem('eventStore'));
  }

  return eventStore;
};
function getEventsFromApi(_x) {
  return _getEventsFromApi.apply(this, arguments);
}

function _getEventsFromApi() {
  _getEventsFromApi = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(events) {
    var entityName,
        eventList,
        res,
        data,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            entityName = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'events';
            eventList = [];
            console.log('Loading');
            _context.prev = 3;
            _context.next = 6;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__.getData)(entityName);

          case 6:
            res = _context.sent;
            console.log(res);
            _context.next = 10;
            return res.json();

          case 10:
            data = _context.sent;
            console.log(data);
            data.forEach(function (obj) {
              var parsedData = JSON.parse(obj.data);

              var item = _objectSpread({
                id: obj.id
              }, parsedData);

              eventList.push(item);
            });
            console.log(eventList);
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](3);
            console.warn(_context.t0);

          case 19:
            _context.prev = 19;
            // eslint-disable-next-line no-param-reassign
            events = eventList;
            console.log(events);

            if (events.length > 0) {
              eventList.forEach(render);
            }

            return _context.finish(19);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 16, 19, 24]]);
  }));
  return _getEventsFromApi.apply(this, arguments);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "6b7b0b408cdf10010fa1"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.212850b8fb4d7c57cd4e.hot-update.js.map