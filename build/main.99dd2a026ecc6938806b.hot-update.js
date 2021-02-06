/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate"]("main",{

/***/ "./module/listeners/listeners.js":
/*!***************************************!*\
  !*** ./module/listeners/listeners.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return __WEBPACK_DEFAULT_EXPORT__; }\n/* harmony export */ });\n/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options */ \"./module/options.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../render */ \"./module/render.js\");\n/* harmony import */ var _UI_select_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UI/select/select */ \"./module/UI/select/select.js\");\n/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup */ \"./module/listeners/popup.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\nvar state = {\n  events: []\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {\n  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.app';\n  var calendar = document.querySelector(selector);\n  var filterByMember = new _UI_select_select__WEBPACK_IMPORTED_MODULE_2__.default('#filter', {\n    label: 'Filter',\n    placeholder: 'Choose member...',\n    defaultSeleted: '0',\n    data: [{\n      id: '0',\n      value: 'All members'\n    }].concat(_toConsumableArray(_options__WEBPACK_IMPORTED_MODULE_0__.DEV_TEAM)),\n    onSelect: function onSelect(item) {\n      console.log(item);\n      var filtered = state.events.reduce(function (arr, event) {\n        // todo filter by reduce\n        event.partisipants.forEach(function (member) {\n          if (member.id === item.id) {\n            arr.push(event);\n          }\n        });\n        return arr;\n      }, []);\n      state.filtered = filtered;\n      (0,_render__WEBPACK_IMPORTED_MODULE_1__.resetGrid)();\n      console.log(filtered);\n      filtered.forEach(_render__WEBPACK_IMPORTED_MODULE_1__.render);\n    }\n  });\n  state.events = (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderFormLS)();\n  console.log(state);\n  state.events.forEach(_render__WEBPACK_IMPORTED_MODULE_1__.render);\n  filterByMember.init();\n  calendar.addEventListener('click', function (e) {\n    var target = e.target;\n\n    if (target.closest(\".\".concat(_options__WEBPACK_IMPORTED_MODULE_0__.CLASS_LIST.OPEN_MODAL))) {\n      var day = '1';\n      var time = '9';\n\n      if (target.matches(\".\".concat(_options__WEBPACK_IMPORTED_MODULE_0__.CLASS_LIST.METTING_CELL))) {\n        time = target.dataset.time;\n        day = target.dataset.day;\n      }\n\n      var modalId = target.dataset.modal;\n      var modal = document.getElementById(modalId);\n      (0,_popup__WEBPACK_IMPORTED_MODULE_3__.default)(modal, state, day, time);\n    }\n\n    if (target.closest(\".\".concat(_options__WEBPACK_IMPORTED_MODULE_0__.CLASS_LIST.RM_EVT))) {\n      var eventSlot = target.closest(\".\".concat(_options__WEBPACK_IMPORTED_MODULE_0__.CLASS_LIST.SLOT_BISY));\n\n      if (eventSlot) {\n        console.dir(eventSlot);\n        var eventIndex = state.events.findIndex(function (event) {\n          return event.id === eventSlot.dataset.eventId;\n        });\n        state.events.splice(eventIndex, 1);\n        eventSlot.dataset.eventId = '';\n        eventSlot.classList.remove(_options__WEBPACK_IMPORTED_MODULE_0__.CLASS_LIST.SLOT_BISY);\n        eventSlot.children[0].textContent = '';\n        eventSlot.children[1].style.display = 'none';\n        localStorage.eventStore = JSON.stringify(state);\n      } else {\n        console.warn('No event');\n      }\n\n      console.log(state);\n    }\n  });\n});\n\n//# sourceURL=webpack:///./module/listeners/listeners.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "6336e623a2917203f235"; }
/******/ 	}();
/******/ 	
/******/ }
);