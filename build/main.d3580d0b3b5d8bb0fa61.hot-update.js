self["webpackHotUpdate"]("main",{

/***/ "./module/addEvent.js":
/*!****************************!*\
  !*** ./module/addEvent.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ addEvent; }
/* harmony export */ });
/* harmony import */ var _apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiUtils/apiUtils */ "./module/apiUtils/apiUtils.js");
/* harmony import */ var _auxiliary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auxiliary */ "./module/auxiliary.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./module/render.js");
/* harmony import */ var _UI_Select_Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/Select/Select */ "./module/UI/Select/Select.js");
/* harmony import */ var _UI_Select_SelectMulti__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UI/Select/SelectMulti */ "./module/UI/Select/SelectMulti.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./module/utils.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable no-param-reassign */






function addEvent(popupId, events, userList) {
  var day = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var popup = document.getElementById(popupId);
  var eventForm = popup.querySelector('#event-form');
  var warnMsg = popup.querySelector(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalWarning));
  var stateEventSlot = {
    event: {
      id: '',
      name: '',
      day: day,
      time: time,
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
  var select = new _UI_Select_SelectMulti__WEBPACK_IMPORTED_MODULE_4__.default('#participants', {
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
  });
  var selectDay = new _UI_Select_Select__WEBPACK_IMPORTED_MODULE_3__.Select('#day', {
    placeholder: 'Choose day...',
    defaultSeleted: day,
    data: _toConsumableArray(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.workWeek),
    onSelect: function onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      stateEventSlot.event.day = selectedItems.id;
    }
  });
  var selectTime = new _UI_Select_Select__WEBPACK_IMPORTED_MODULE_3__.Select('#time', {
    placeholder: 'Choose time...',
    defaultSeleted: time,
    data: (0,_utils__WEBPACK_IMPORTED_MODULE_5__.getTimeTable)(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.eventHours),
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
    selectTime.selectionResult();
    events.forEach(function (event) {
      if (event.day === stateEventSlot.event.day && event.time === stateEventSlot.event.time) {
        stateEventSlot.isBooked = true;
      }
    });

    if (!stateEventSlot.isBooked) {
      storeEvent(events, stateEventSlot.event, addEvent.close, warnMsg);
    } else {
      warnMsg.children[1].textContent = msg.timeErr;
      warnMsg.classList.add('active');
    }
  };

  var clickHandler = function clickHandler(e) {
    var target = e.target;

    if (target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.triggerClose)) || target.classList.contains(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive)) {
      addEvent.close();
    }

    if (target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalWarning))) {
      warnMsg.classList.remove('active');
    }
  };

  addEvent.close = function () {
    popup.removeEventListener('click', clickHandler);
    eventForm.removeEventListener('submit', submitHandler);
    eventForm.removeEventListener('input', inputHandler);
    select.destroy();
    selectDay.destroy();
    selectTime.destroy();
    eventForm.reset();
    warnMsg.classList.remove('active');
    popup.classList.remove(_auxiliary__WEBPACK_IMPORTED_MODULE_1__.classes.modalActive);
  };

  popup.addEventListener('click', clickHandler);
  eventForm.addEventListener('input', inputHandler);
  eventForm.addEventListener('submit', submitHandler);
}

function storeEvent(_x, _x2, _x3, _x4) {
  return _storeEvent.apply(this, arguments);
}

function _storeEvent() {
  _storeEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(events, event, closeHandler, msgBlock) {
    var delay, msg, status, eventJson, res, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            delay = 6000;
            msg = {
              icon: msgBlock.children[0],
              text: msgBlock.children[1],
              loading: 'Event store in progress...',
              success: 'New event stored',
              error: 'Something wrong, try again',
              loadingCss: 'color: #e0b411; background-color: #fdfda6',
              okCss: 'color: green; background-color: #7fef7d',
              loadinIconCls: 'fa-sync-alt',
              okIconCls: 'fa-check'
            };
            status = 0;
            msg.icon.classList.remove('fa-exclamation-circle');
            msg.icon.classList.add(msg.loadinIconCls);
            msgBlock.style.cssText = msg.loadingCss;
            msg.text.textContent = msg.loading;
            msgBlock.classList.add('active');
            eventJson = JSON.stringify(event);
            _context.prev = 9;
            _context.next = 12;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_0__.postData)('events', eventJson);

          case 12:
            res = _context.sent;
            status = res.status;
            _context.next = 16;
            return res.json();

          case 16:
            data = _context.sent;
            event.id = data.id;
            events.push(event);
            console.log(events);
            (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)(event);
            msg.icon.classList.remove(msg.loadinIconCls);
            msg.icon.classList.add(msg.okIconCls);
            msgBlock.style.cssText = msg.okCss;
            msg.text.textContent = msg.success;
            _context.next = 34;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](9);
            msg.icon.classList.remove(msg.okIconCls);
            msg.icon.classList.add('fa-exclamation-circle');
            msgBlock.style.cssText = '';
            msg.text.textContent = msg.error;
            console.warn(_context.t0);

          case 34:
            _context.prev = 34;

            if (status === 200) {
              setTimeout(function () {
                closeHandler();
                msg.icon.classList.remove(msg.okIconCls);
                msg.icon.classList.add('fa-exclamation-circle');
                msgBlock.style.cssText = '';
                msg.text.textContent = '';
                msgBlock.classList.remove('active');
              }, delay);
            }

            return _context.finish(34);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 27, 34, 37]]);
  }));
  return _storeEvent.apply(this, arguments);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "5ab2afbff2d7f3e781ba"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.d3580d0b3b5d8bb0fa61.hot-update.js.map