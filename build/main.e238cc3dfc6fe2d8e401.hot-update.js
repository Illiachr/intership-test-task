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
/* harmony import */ var _apiUtils_js_apiUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../apiUtils.js/apiUtils */ "./apiUtils.js/apiUtils.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-unused-vars */





function appTemplate(selector) {
  var app = document.querySelector(selector);
  var template = " <div class=\"controls\">\n            <h2 class=\"title\">Calendar</h2>\n            <div id=\"filter\"></div>\n            <button class=\"btn js-modal-open\" data-type=\"add-event\" data-modal=\"modal-event\">\n                <span>New event</span>\n                <span class=\"fas fa-plus\"></span>\n            </button>            \n        </div>\n        <div class=\"calendar-grid\">\n        </div>";
  var loader = (0,_loader__WEBPACK_IMPORTED_MODULE_3__.default)();
  document.body.append(loader); // loader.classList.add('active');

  app.insertAdjacentHTML('beforeend', template);
  getList(loader, app); // showGrid();

  (0,_modalTemplates__WEBPACK_IMPORTED_MODULE_1__.default)(); // userAuth('login');
}

function getList() {
  return _getList.apply(this, arguments);
} // function getList() {
//  if (loader) { loader.classList.add('active'); }
//   getData('users')
//     .then(res => {
//       if (res.status !== 200) { throw new Error('Network status not 200'); }
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       const list = [];
//       data.forEach(obj => {
//         const item = { id: obj.id, ...JSON.parse(obj.data) };
//         list.push(item);
//       });
//       console.log(list);
//       // const users = getList(data);
//       // console.log(users);
//     })
//     .catch(err => console.warn(err));
// }


function _getList() {
  _getList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var loader,
        app,
        userList,
        res,
        data,
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
            _context.prev = 4;
            _context.next = 7;
            return (0,_apiUtils_js_apiUtils__WEBPACK_IMPORTED_MODULE_4__.getData)('users');

          case 7:
            res = _context.sent;

            if (!(res.status === 200)) {
              _context.next = 16;
              break;
            }

            _context.next = 11;
            return res.json();

          case 11:
            data = _context.sent;
            data.forEach(function (obj) {
              var parsedData = JSON.parse(obj.data);
              var item = {
                id: obj.id,
                value: parsedData.name,
                role: parsedData.type
              };
              userList.push(item);
            });
            console.log(userList);
            _context.next = 17;
            break;

          case 16:
            throw new Error('Network status not 200');

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](4);
            console.warn(_context.t0);

          case 22:
            _context.prev = 22;

            if (loader) {
              loader.classList.remove('active');
            }

            app.classList.add('active');
            (0,_showGrid__WEBPACK_IMPORTED_MODULE_0__.default)();
            (0,_login__WEBPACK_IMPORTED_MODULE_2__.default)('login', userList);
            return _context.finish(22);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 19, 22, 28]]);
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
/******/ 		__webpack_require__.h = function() { return "13ece99778194bd36808"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.e238cc3dfc6fe2d8e401.hot-update.js.map