self["webpackHotUpdate"]("main",{

/***/ "./module/removeEvent.js":
/*!*******************************!*\
  !*** ./module/removeEvent.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _apiUtils_js_apiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiUtils.js/apiUtils */ "./module/apiUtils.js/apiUtils.js");
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (modalId, elem, events) {
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
            return (0,_apiUtils_js_apiUtils__WEBPACK_IMPORTED_MODULE_0__.deleteData)(entityName, elem.dataset.eventId);

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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "8773317fe8f8582f9ae9"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.2b921bd7f17a540fe0fa.hot-update.js.map