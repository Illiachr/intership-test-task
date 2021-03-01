self["webpackHotUpdate"]("main",{

/***/ "./module/Calendar/Calendar.js":
/*!*************************************!*\
  !*** ./module/Calendar/Calendar.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Calendar; }
/* harmony export */ });
/* harmony import */ var _addEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../addEvent */ "./module/addEvent.js");
/* harmony import */ var _apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apiUtils/apiUtils */ "./module/apiUtils/apiUtils.js");
/* harmony import */ var _auxiliary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auxiliary */ "./module/auxiliary.js");
/* harmony import */ var _removeEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../removeEvent */ "./module/removeEvent.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../render */ "./module/render.js");
/* harmony import */ var _UI_select_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../UI/select/select */ "./module/UI/select/select.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils */ "./module/utils.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var Calendar = /*#__PURE__*/function () {
  function Calendar(selector, user, userList, events) {
    _classCallCheck(this, Calendar);

    this.root = document.querySelector(selector);
    this.user = user;
    this.userList = userList;
    this.msgBlock = this.root.querySelector('[data-type="controls-warning"]');
    this.addEventBtn = this.root.querySelector('[data-type="add-event"]');
    this.events = events || [];
    this.filtred = [];
    this.handlers = {
      click: [],
      dragNdrop: []
    };
    this.activeEvents = {};
    this.init();
  }

  _createClass(Calendar, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.events.length > 0) {
        this.events.forEach(_render__WEBPACK_IMPORTED_MODULE_4__.render);
      }

      this.user.rights.forEach(function (right) {
        return _this[getMethodName(right)]();
      });
      this.clickListener();
    }
  }, {
    key: "clickListener",
    value: function clickListener() {
      var _this2 = this;

      var clickHandler = function clickHandler(e) {
        var target = e.target;

        _this2.handlers.click.forEach(function (handler) {
          return _this2[handler](target);
        });
      };

      this.root.addEventListener('click', clickHandler);
    }
  }, {
    key: "onFilter",
    value: function onFilter() {
      var userList = this.userList;
      var filter = this.filterByUser.bind(this); // eslint-disable-next-line no-unused-vars

      var filterByMember = new _UI_select_select__WEBPACK_IMPORTED_MODULE_5__.default('#filter', {
        label: 'Filter',
        placeholder: 'Choose member...',
        defaultSeleted: '0',
        data: [{
          id: '0',
          value: 'All members'
        }].concat(_toConsumableArray(userList)),
        onSelect: function onSelect(item) {
          filter(item);
        }
      });
    }
  }, {
    key: "onAdd",
    value: function onAdd() {
      this.newEvent = this.newEvent.bind(this);
      this.handlers.click.push('newEvent');
      this.addEventBtn.style.display = 'flex';
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      this.rmEvent = this.rmEvent.bind(this);
      this.handlers.click.push('rmEvent');
    }
  }, {
    key: "onUpdatedd",
    value: function onUpdatedd() {
      var _this3 = this;

      this.root.addEventListener('dragstart', function (e) {
        var target = e.target,
            dataTransfer = e.dataTransfer;
        var dragTarget = target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.slotBooked));

        if (dragTarget) {
          dataTransfer.setData('text/plain', dragTarget.dataset.eventId);
        }
      });
      this.root.addEventListener('dragenter', function (e) {
        var target = e.target;
        var targetBooked = target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.slotBooked));

        if (!targetBooked && target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.eventSlot))) {
          e.target.classList.add('drag-hover');
        }
      });
      this.root.addEventListener('dragover', function (e) {
        var target = e.target;
        var targetBooked = target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.slotBooked));

        if (!targetBooked && target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.eventSlot))) {
          e.preventDefault();
        }
      });
      this.root.addEventListener('dragleave', function (e) {
        e.target.classList.remove('drag-hover');
      });
      this.root.addEventListener('drop', function (e) {
        var target = e.target,
            dataTransfer = e.dataTransfer;
        var targetBooked = target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.slotBooked));

        if (!targetBooked && target.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.eventSlot))) {
          e.preventDefault();
          target.classList.remove('drag-hover');
          var eventId = dataTransfer.getData('text/plain');
          dataTransfer.setData('text/plain', '');

          var eventIndex = _this3.events.findIndex(function (event) {
            return event.id === eventId;
          });

          _this3.events[eventIndex].time = target.dataset.time;
          _this3.events[eventIndex].day = target.dataset.day;
          updateEvent(_this3.events, eventIndex, _this3.msgBlock);
        }
      });
    }
  }, {
    key: "filterByUser",
    value: function filterByUser(item) {
      if (item.id === '0') {
        (0,_render__WEBPACK_IMPORTED_MODULE_4__.resetGrid)();
        this.events.forEach(_render__WEBPACK_IMPORTED_MODULE_4__.render);
        return;
      }

      var filtred = this.events.reduce(function (arr, event) {
        event.partisipants.forEach(function (member) {
          if (member.id === item.id) {
            arr.push(event);
          }
        });
        return arr;
      }, []);
      this.filtred = filtred;
      (0,_render__WEBPACK_IMPORTED_MODULE_4__.resetGrid)();
      filtred.forEach(_render__WEBPACK_IMPORTED_MODULE_4__.render);
    }
  }, {
    key: "newEvent",
    value: function newEvent(elem) {
      if (elem.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.triggerOpen))) {
        var targetElem = elem.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.triggerOpen));
        var firstFree = (0,_utils__WEBPACK_IMPORTED_MODULE_6__.firstFreeSlot)(this.root);
        var day = targetElem.dataset.day ? targetElem.dataset.day : firstFree.day;
        var time = targetElem.dataset.time ? targetElem.dataset.time : firstFree.time;
        var modalId = targetElem.dataset.modal;

        if (modalId) {
          (0,_addEvent__WEBPACK_IMPORTED_MODULE_0__.default)(modalId, this.events, this.userList, day, time);
        }
      }
    }
  }, {
    key: "rmEvent",
    value: function rmEvent(elem) {
      if (elem.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.removeEvent))) {
        var eventSlot = elem.closest(".".concat(_auxiliary__WEBPACK_IMPORTED_MODULE_2__.classes.slotBooked));

        if (eventSlot) {
          (0,_removeEvent__WEBPACK_IMPORTED_MODULE_3__.default)('event-remove', eventSlot, this.events);
        } else {
          console.warn('No event');
        }
      }
    }
  }]);

  return Calendar;
}();



function getMethodName(eventName) {
  return "on".concat((0,_utils__WEBPACK_IMPORTED_MODULE_6__.capitalize)(eventName));
}

function updateEvent(_x, _x2, _x3) {
  return _updateEvent.apply(this, arguments);
}

function _updateEvent() {
  _updateEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(events, eventIndex, msgBlock) {
    var delay, msg, status, eventJson, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            delay = 10000;
            msg = {
              icon: msgBlock.children[0],
              text: msgBlock.children[1],
              loading: 'Updating event...',
              success: 'Event updated',
              error: 'Something wrong, try again',
              loadinIconCls: 'fa-sync-alt',
              okIconCls: 'fa-check',
              erorrIconCls: 'fa-check'
            };
            status = 0; // eslint-disable-next-line no-param-reassign

            msg.text.textContent = msg.loading;
            msgBlock.classList.add('active');
            eventJson = JSON.stringify(events[eventIndex]);
            _context.prev = 6;
            _context.next = 9;
            return (0,_apiUtils_apiUtils__WEBPACK_IMPORTED_MODULE_1__.updateData)('events', events[eventIndex].id, eventJson);

          case 9:
            res = _context.sent;
            status = res.status;
            (0,_render__WEBPACK_IMPORTED_MODULE_4__.resetGrid)();
            events.forEach(_render__WEBPACK_IMPORTED_MODULE_4__.render);
            msg.icon.classList.remove(msg.loadinIconCls);
            msg.icon.classList.add(msg.okIconCls);
            msg.text.textContent = msg.success;
            _context.next = 24;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](6);
            msg.icon.classList.remove(msg.okIconCls);
            msg.icon.classList.add(msg.erorrIconCls);
            msg.text.textContent = msg.error;
            console.warn(_context.t0);

          case 24:
            _context.prev = 24;

            if (status === 200) {
              setTimeout(function () {
                msg.icon.classList.remove(msg.okIconCls);
                msg.icon.classList.add(msg.loadinIconCls);
                msg.text.textContent = '';
                msgBlock.classList.remove('active');
              }, delay);
            }

            return _context.finish(24);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 18, 24, 27]]);
  }));
  return _updateEvent.apply(this, arguments);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "6d34d546748470acff80"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.a0dcef26e16270da62b5.hot-update.js.map