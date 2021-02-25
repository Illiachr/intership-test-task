self["webpackHotUpdate"]("main",{

/***/ "./module/appTemplate.js":
/*!*******************************!*\
  !*** ./module/appTemplate.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ appTemplate; }
/* harmony export */ });
/* harmony import */ var _showGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./showGrid */ "./module/showGrid.js");
/* harmony import */ var _modalTemplates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modalTemplates */ "./module/modalTemplates.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ "./module/login.js");



function appTemplate(selector) {
  var app = document.querySelector(selector);
  var template = " <div class=\"controls\">\n            <h2 class=\"title\">Calendar</h2>\n            <div id=\"filter\"></div>\n            <button class=\"btn js-modal-open\" data-type=\"add-event\" data-modal=\"modal-event\">\n                <span>New event</span>\n                <span class=\"fas fa-plus\"></span>\n            </button>            \n        </div>\n        <div class=\"calendar-grid\">\n        </div>";
  app.insertAdjacentHTML('beforeend', template);
  (0,_showGrid__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_modalTemplates__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_login__WEBPACK_IMPORTED_MODULE_2__.default)('login');
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "3d6a890005b1cce3ca06"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.c16723beda62ffcb5fca.hot-update.js.map