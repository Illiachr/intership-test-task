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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
      console.log('userList:', userList);
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
          console.log(item);
          filter(item);
        }
      }); // this.events = getEventStore();
      // console.log(this.events);
      // if (this.events.length > 0) {
      //   this.events.forEach(render);
      // }
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
          console.log(_this3.events);

          var eventIndex = _this3.events.findIndex(function (event) {
            return event.id === eventId;
          });

          _this3.events[eventIndex].time = target.dataset.time;
          _this3.events[eventIndex].day = target.dataset.day;
          updateEvent(_this3.events, eventIndex);
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

function updateEvent(_x, _x2) {
  return _updateEvent.apply(this, arguments);
}

function _updateEvent() {
  _updateEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(events, eventIndex) {
    var eventJson, res, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Event store in progress...');
            eventJson = JSON.stringify(events[eventIndex]);
            _context.prev = 2;
            _context.next = 5;
            return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('events', events[eventIndex].id, eventJson);

          case 5:
            res = _context.sent;
            _context.next = 8;
            return res.text();

          case 8:
            data = _context.sent;
            console.log(data);
            localStorage.eventStore = JSON.stringify(events);
            (0,_render__WEBPACK_IMPORTED_MODULE_4__.resetGrid)();
            events.forEach(_render__WEBPACK_IMPORTED_MODULE_4__.render);
            console.log('Event updated');
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            console.warn(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _updateEvent.apply(this, arguments);
}

/***/ }),

/***/ "./module/addEvent.js":
/*!****************************!*\
  !*** ./module/addEvent.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
            return Object(function webpackMissingModule() { var e = new Error("Cannot find module './apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('events', eventJson);

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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-unused-vars */





function appTemplate(selector) {
  var app = document.querySelector(selector);
  var template = " <div class=\"controls\">\n            <h2 class=\"title\">Calendar</h2>\n            <div class=\"modal__dialog-header-warning\" id=\"modal-warning\">\n              <span class=\"fas fa-exclamation-circle\"></span>\n              <span class=\"modal__dialog-header-warning-text\"></span>\n              <span class=\"modal__dialog-header-warning-close fas fa-times-circle\"></span>\n            </div>\n            <div id=\"filter\"></div>\n            <button class=\"btn js-modal-open\" data-type=\"add-event\" data-modal=\"modal-event\">\n                <span>New event</span>\n                <span class=\"fas fa-plus\"></span>\n            </button>            \n        </div>\n        <div class=\"calendar-grid\">\n        </div>";
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
            return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('users');

          case 8:
            res = _context.sent;
            _context.next = 11;
            return Object(function webpackMissingModule() { var e = new Error("Cannot find module '../apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('events');

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

/***/ }),

/***/ "./module/removeEvent.js":
/*!*******************************!*\
  !*** ./module/removeEvent.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module './apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
            return Object(function webpackMissingModule() { var e = new Error("Cannot find module './apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(entityName, elem.dataset.eventId);

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
Object(function webpackMissingModule() { var e = new Error("Cannot find module './apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
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
            return Object(function webpackMissingModule() { var e = new Error("Cannot find module './apiUtils.js/apiUtils'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(entityName);

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
/******/ 		__webpack_require__.h = function() { return "96498b1dc7e5c323915f"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.a6a8c235d4accca6c1f1.hot-update.js.map