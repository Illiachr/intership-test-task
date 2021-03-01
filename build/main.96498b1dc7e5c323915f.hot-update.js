self["webpackHotUpdate"]("main",{

/***/ "./module/addEvent.js":
/*!****************************!*\
  !*** ./module/addEvent.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiUtils/apiUtils */ "./module/apiUtils/apiUtils.js");
/* harmony import */ var _auxiliary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auxiliary */ "./module/auxiliary.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./module/render.js");
/* harmony import */ var _UI_select_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/select/select */ "./module/UI/select/select.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




 // const generateId = () => `e${(Math.trunc(Math.random() * 1e8)).toString(16)}`;

/* harmony default export */ __webpack_exports__["default"] = (function (popupId, events, userList) {
  var day = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var popup = document.getElementById(popupId);
  var eventForm = popup.querySelector('#event-form');
  var warnMsg = popup.querySelector(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalWarning));
  var stateEventSlot = {
    event: {
      partisipants: []
    },
    isBooked: false
  };
  var msg = {
    processed: 'Event store in progress...',
    success: 'Event is stored',
    nameWarn: 'Enter event name, please',
    inputWarn: 'Only letters a-z and space, please',
    timeErr: 'Failed to create event. This time is already booked',
    regExpNameReplace: /[^a-z\s]/gi,
    regExpNameTest: /[a-z\s]/gi
  };
  popup.classList.add(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive);
  var select = new _UI_select_select__WEBPACK_IMPORTED_MODULE_3__.default('#participants', {
    defaultSeleted: '0',
    data: [{
      id: '0',
      value: 'All members'
    }].concat(_toConsumableArray(userList)),
    onSelect: function onSelect(selectedItems) {
      var members = [];

      if (selectedItems.length <= 1 && selectedItems[0] === this.data[0].value) {
        members = this.data.reduce(function (total, item) {
          selectedItems.forEach(function (selectItem) {
            if (selectItem !== item.value) {
              total.push(item);
            }
          });
          return total;
        }, []);
      } else {
        members = this.data.reduce(function (total, item) {
          selectedItems.forEach(function (selectItem) {
            if (selectItem === item.value) {
              total.push(item);
            }
          });
          return total;
        }, []);
      }

      stateEventSlot.event.partisipants = _toConsumableArray(members);
    }
  }, true);
  var selectDay = new _UI_select_select__WEBPACK_IMPORTED_MODULE_3__.default('#day', {
    placeholder: 'Choose day...',
    defaultSeleted: day,
    data: _toConsumableArray(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.workWeek),
    onSelect: function onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      stateEventSlot.event.day = selectedItems.id;
    }
  });
  var eventTimeTable = [];

  for (var hour = +_auxiliary__WEBPACK_IMPORTED_MODULE_1__.eventHours.start; hour <= +_auxiliary__WEBPACK_IMPORTED_MODULE_1__.eventHours.end; hour += +_auxiliary__WEBPACK_IMPORTED_MODULE_1__.eventHours.step) {
    var eventTime = {
      id: "".concat(hour),
      value: "".concat(hour, ":00")
    };
    eventTimeTable.push(eventTime);
  }

  var selectTime = new _UI_select_select__WEBPACK_IMPORTED_MODULE_3__.default('#time', {
    placeholder: 'Choose time...',
    defaultSeleted: time,
    data: eventTimeTable,
    onSelect: function onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      stateEventSlot.event.time = selectedItems.id;
    }
  });

  var inputHandler = function inputHandler(e) {
    var target = e.target;

    if (target === eventForm.name) {
      var checkValue = msg.regExpNameTest.test(target.value);

      if (checkValue) {
        warnMsg.classList.remove('active');
      } else {
        warnMsg.children[1].textContent = msg.inputWarn;
        warnMsg.classList.add('active');
      }

      target.value = target.value.replace(msg.regExpNameReplace, '');
    }
  };

  var submitHandler = function submitHandler(e) {
    e.preventDefault();
    stateEventSlot.isBooked = false;

    if (eventForm.name.value.trim() === '') {
      warnMsg.children[1].textContent = msg.nameWarn;
      warnMsg.classList.add('active');
      return;
    }

    stateEventSlot.event.name = eventForm.name.value;
    select.selectionResult();
    selectDay.selectionResult();
    selectTime.selectionResult();
    events.forEach(function (event) {
      if (event.day === stateEventSlot.event.day && event.time === stateEventSlot.event.time) {
        stateEventSlot.isBooked = true;
      }
    });

    if (!stateEventSlot.isBooked) {
      events.push(stateEventSlot.event);
      storeEvent(stateEventSlot.event);
      localStorage.eventStore = JSON.stringify(events);
      closePopup();
    } else {
      warnMsg.children[1].textContent = msg.timeErr;
      warnMsg.classList.add('active');
    }
  };

  var clickHandler = function clickHandler(e) {
    var target = e.target;

    if (target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.triggerClose)) || target.classList.contains(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive)) {
      closePopup();
    }

    if (target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalWarning))) {
      warnMsg.classList.remove('active');
    }
  };

  function closePopup() {
    popup.removeEventListener('click', clickHandler);
    eventForm.removeEventListener('submit', submitHandler);
    eventForm.removeEventListener('input', inputHandler);
    select.destroy();
    selectDay.destroy();
    selectTime.destroy();
    eventForm.reset();
    warnMsg.classList.remove('active');
    popup.classList.remove(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive);
  }

  popup.addEventListener('click', clickHandler);
  eventForm.addEventListener('input', inputHandler);
  eventForm.addEventListener('submit', submitHandler);
});

function storeEvent(_x) {
  return _storeEvent.apply(this, arguments);
}

function _storeEvent() {
  _storeEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var eventJson, res, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Event store in progress...');
            eventJson = JSON.stringify(event);
            _context.prev = 2;
            _context.next = 5;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__.postData)('events', eventJson);

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.json();

          case 8:
            data = _context.sent;
            console.log(data.id); // eslint-disable-next-line no-param-reassign

            event.id = data.id;
            (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)(event);
            console.log('New event stored');
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](2);
            console.warn(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 15]]);
  }));
  return _storeEvent.apply(this, arguments);
}

/***/ }),

/***/ "./module/apiUtils/apiUtils.js":
/*!*************************************!*\
  !*** ./module/apiUtils/apiUtils.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": function() { return /* binding */ getData; },
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "updateData": function() { return /* binding */ updateData; },
/* harmony export */   "deleteData": function() { return /* binding */ deleteData; }
/* harmony export */ });
var url = 'http://158.101.166.74:8080/api/data/illia_cherkasov/';
var getData = function getData(entityName) {
  return fetch(url + entityName);
};
var postData = function postData(entityName, objInJson) {
  return fetch("".concat(url).concat(entityName), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: objInJson
    })
  });
};
var updateData = function updateData(entityName, id, objInjson) {
  return fetch("".concat(url).concat(entityName, "/").concat(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: objInjson
    })
  });
};
var deleteData = function deleteData(entityName, id) {
  return fetch("".concat(url).concat(entityName, "/").concat(id), {
    method: 'DELETE'
  });
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "212850b8fb4d7c57cd4e"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.96498b1dc7e5c323915f.hot-update.js.map