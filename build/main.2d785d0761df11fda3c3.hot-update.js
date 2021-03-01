self["webpackHotUpdate"]("main",{

/***/ "./module/UI/select/select.js":
/*!************************************!*\
  !*** ./module/UI/select/select.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Select; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var classes = {
  base: 'select',
  selected: 'selected',
  open: 'select--open',
  close: 'select--close',
  arrowRight: 'fa-chevron-right',
  arrowDown: 'fa-chevron-down',
  dropDown: 'select__dropdown'
};

var getTemplate = function getTemplate(props) {
  var _props$defaultValue;

  var defVal = (_props$defaultValue = props.defaultValue) !== null && _props$defaultValue !== void 0 ? _props$defaultValue : 'Choose option...';
  var items = props.data.map(function (item) {
    var cls = '';

    if (props.selectedId && item.id === props.selectedId) {
      defVal = item.value;
      cls = classes.selected;
    }

    return "\n            <li class=\"".concat(classes.dropDown, "-item ").concat(cls, "\"\n                data-type=\"item\"\n                data-id=\"").concat(item.id, "\"\n            >\n                <span>").concat(item.value, "</span>\n                <span class=\"").concat(classes.dropDown, "-item-option\">").concat(item.role || '', "</span>\n            </li>\n        ");
  });
  return "        \n            <div class=\"".concat(classes.base, "__backdrop\" data-type=\"backdrop\"></div>\n            <div class=\"").concat(classes.base, "__wrapper\">\n                <div class=\"").concat(classes.base, "__input\" data-type=\"input\" data-action=\"toggle\">\n                    <span data-type=\"value\">").concat(defVal, "</span>\n                    <span class=\"fas fa-chevron-right\" data-type=\"arrow\"></span>\n                </div>\n                <div class=\"").concat(classes.dropDown, "\">\n                    <ul class=\"").concat(classes.dropDown, "-list\">\n                        ").concat(items.join(''), "\n                    </ul>\n                </div>\n            </div>\n    ");
};

var Select = /*#__PURE__*/function () {
  function Select(selector, options) {
    var multi = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Select);

    this.elem = document.querySelector(selector);
    this.options = options;
    this.multi = multi;
    this.selectedId = options.defaultSeleted;
    this.selectedItems = [];
    this.init();
  }

  _createClass(Select, [{
    key: "init",
    value: function init() {
      this.render();
      this.setup();
    }
  }, {
    key: "render",
    value: function render() {
      var data = this.options.data;
      this.elem.classList.add('select');
      this.elem.insertAdjacentHTML('beforeend', getTemplate({
        data: data,
        selectedId: this.selectedId
      }));
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      var data = this.options.data;
      this.clickHandler = this.clickHandler.bind(this);
      this.elem.addEventListener('click', this.clickHandler);
      this.arrow = this.elem.querySelector('[data-type="arrow"]');
      this.value = this.elem.querySelector('[data-type="value"]');
      this.selectedItems = data.reduce(function (total, item) {
        if (item.id === _this.selectedId) {
          total.push(item.value);
        }

        return total;
      }, []);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      var target = e.target;
      var type = target.dataset.type;
      var input = target.closest('[data-type="input"]');

      if (input) {
        this.toggle();
      }

      if (type === 'item') {
        if (this.multi) {
          this.multiSelect(target.dataset.id);
        } else {
          this.select(target.dataset.id);
        }
      }

      if (type === 'backdrop') {
        this.close();
      }
    }
  }, {
    key: "open",
    value: function open() {
      this.arrow.classList.remove(classes.arrowRight);
      this.arrow.classList.add(classes.arrowDown);
      this.elem.classList.add(classes.open);
    }
  }, {
    key: "close",
    value: function close() {
      this.arrow.classList.remove(classes.arrowDown);
      this.arrow.classList.add(classes.arrowRight);
      this.elem.classList.remove(classes.open);
      this.selectionResult();
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.elem.classList.contains(classes.open);
    }
  }, {
    key: "current",
    get: function get() {
      var _this2 = this;

      return this.options.data.find(function (item) {
        return item.id === _this2.selectedId;
      });
    }
  }, {
    key: "isSelected",
    get: function get() {
      var _this3 = this;

      return this.selectedItems.findIndex(function (item) {
        return item === _this3.current.value;
      });
    }
  }, {
    key: "select",
    value: function select(id) {
      this.selectedId = id;
      this.value.textContent = this.current.value;
      this.elem.querySelectorAll('[data-type="item"]').forEach(function (el) {
        el.classList.remove('selected');
      });
      this.elem.querySelector("[data-id=\"".concat(id, "\"]")).classList.add('selected');
      this.close();
    }
  }, {
    key: "multiSelect",
    value: function multiSelect(id) {
      if (this.selectedItems.length <= 1 && this.selectedItems[0] === 'All members') {
        this.elem.querySelector("[data-id=\"".concat(this.selectedId, "\"]")).classList.remove(classes.selected);
        this.selectedItems.splice(this.isSelected, 1);
        this.elem.querySelectorAll('[data-type="item"]').forEach(function (elem) {
          elem.classList.remove(classes.selected);
        });
      }

      this.selectedId = id;
      var selectedItem = this.elem.querySelector("[data-id=\"".concat(this.selectedId, "\"]"));

      if (this.selectedId === '0' && !selectedItem.classList.contains(classes.selected)) {
        console.log(id);
        this.selectedItems = [];
        this.selectedItems.push(this.current.value);
        this.elem.querySelectorAll('[data-type="item"]').forEach(function (elem) {
          elem.classList.add(classes.selected);
        });
        this.value.textContent = this.selectedItems.join(', ');
        return;
      }

      if (this.isSelected < 0) {
        this.selectedItems.push(this.current.value);
        selectedItem.classList.add(classes.selected);
      } else if (this.selectedItems.length > 1) {
        console.log(this.selectedItems.length);
        this.selectedItems.splice(this.isSelected, 1);
        selectedItem.classList.remove(classes.selected);
      }

      this.value.textContent = this.selectedItems.join(', ');
    }
  }, {
    key: "selectionResult",
    value: function selectionResult() {
      if (this.options.onSelect) {
        if (this.multi) {
          this.options.onSelect(this.selectedItems);
        } else {
          this.options.onSelect(this.current);
        }
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.elem.removeEventListener('click', this.clickHandler);
      this.elem.textContent = '';
    }
  }]);

  return Select;
}();



/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "898a8d6ba1a74b4f1409"; }
/******/ 	}();
/******/ 	
/******/ }
);
//# sourceMappingURL=main.2d785d0761df11fda3c3.hot-update.js.map