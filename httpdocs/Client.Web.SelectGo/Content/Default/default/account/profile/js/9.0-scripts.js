"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        setTimeout(fn, 1);
    }
};

var resize = function resize(fn) {
    return window.addEventListener('resize', fn);
};

var isIterableArray = function isIterableArray(array) {
    return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
    var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
    return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
    try {
        return JSON.parse(el.dataset[camelize(data)]);
    } catch (e) {
        return el.dataset[camelize(data)];
    }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
    var hex;
    hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    }));
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
    return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var colors = {
    primary: '#2c7be5',
    secondary: '#748194',
    success: '#00d27a',
    info: '#27bcfd',
    warning: '#f5803e',
    danger: '#e63757',
    light: '#f9fafd',
    dark: '#0b1727'
};
var grays = {
    white: '#fff',
    100: '#f9fafd',
    200: '#edf2f9',
    300: '#d8e2ef',
    400: '#b6c1d2',
    500: '#9da9bb',
    600: '#748194',
    700: '#5e6e82',
    800: '#4d5969',
    900: '#344050',
    1000: '#232e3c',
    1100: '#0b1727',
    black: '#000'
};

var hasClass = function hasClass(el, className) {
    !el && false;
    return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
    el.classList.add(className);
};

var getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    };
};

var isScrolledIntoView = function isScrolledIntoView(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        // eslint-disable-next-line no-param-reassign
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return {
        all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
        partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
    };
};

var breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
    var classes = el && el.classList.value;
    var breakpoint;

    if (classes) {
        breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
            return cls.includes('navbar-expand-');
        }).pop().split('-').pop()];
    }

    return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expire);
    document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
    var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
    return keyValue ? keyValue[2] : keyValue;
};

var settings = {
    tinymce: {
        theme: 'oxide'
    },
    chart: {
        borderColor: 'rgba(255, 255, 255, 0.8)'
    }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
    var ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

    try {
        return JSON.parse(store.getItem(key)) || defaultValue;
    } catch (_unused) {
        return store.getItem(key) || defaultValue;
    }
};

var setItemToStore = function setItemToStore(key, payload) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
    return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
    return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

var utils = {
    docReady: docReady,
    resize: resize,
    isIterableArray: isIterableArray,
    camelize: camelize,
    getData: getData,
    hasClass: hasClass,
    addClass: addClass,
    hexToRgb: hexToRgb,
    rgbaColor: rgbaColor,
    colors: colors,
    grays: grays,
    getOffset: getOffset,
    isScrolledIntoView: isScrolledIntoView,
    getBreakpoint: getBreakpoint,
    setCookie: setCookie,
    getCookie: getCookie,
    newChart: newChart,
    settings: settings,
    getItemFromStore: getItemFromStore,
    setItemToStore: setItemToStore,
    getStoreSpace: getStoreSpace
};
/*-----------------------------------------------
|   Node
-----------------------------------------------*/


var Node = function () {
    function Node(node) {
        _classCallCheck(this, Node);

        this.node = node;
    }

    _createClass(Node, [{
        key: "addClass",
        value: function addClass(className) {
            this.isValidNode() && this.node.classList.add(className);
        }
    }, {
        key: "removeClass",
        value: function removeClass(className) {
            this.isValidNode() && this.node.classList.remove(className);
        }
    }, {
        key: "toggleClass",
        value: function toggleClass(className) {
            this.isValidNode() && this.node.classList.toggle(className);
        }
    }, {
        key: "hasClass",
        value: function hasClass(className) {
            this.isValidNode() && this.node.classList.contains(className);
        }
    }, {
        key: "data",
        value: function data(key) {
            if (this.isValidNode()) {
                try {
                    return JSON.parse(this.node.dataset[this.camelize(key)]);
                } catch (e) {
                    return this.node.dataset[this.camelize(key)];
                }
            }

            return null;
        }
    }, {
        key: "attr",
        value: function attr(name) {
            return this.isValidNode() && this.node[name];
        }
    }, {
        key: "setAttribute",
        value: function setAttribute(name, value) {
            this.isValidNode() && this.node.setAttribute(name, value);
        }
    }, {
        key: "removeAttribute",
        value: function removeAttribute(name) {
            this.isValidNode() && this.node.removeAttribute(name);
        }
    }, {
        key: "setProp",
        value: function setProp(name, value) {
            this.isValidNode() && (this.node[name] = value);
        }
    }, {
        key: "on",
        value: function on(event, cb) {
            this.isValidNode() && this.node.addEventListener(event, cb);
        }
    }, {
        key: "isValidNode",
        value: function isValidNode() {
            return !!this.node;
        } // eslint-disable-next-line class-methods-use-this

    }, {
        key: "camelize",
        value: function camelize(str) {
            var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
                return c ? c.toUpperCase() : '';
            });
            return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
        }
    }]);

    return Node;
}();
/*-----------------------------------------------
|   Bulk Select
-----------------------------------------------*/

var BulkSelect = function () {
    function BulkSelect(element, option) {
        _classCallCheck(this, BulkSelect);

        this.element = new Node(element);
        this.option = _objectSpread({
            displayNoneClassName: 'd-none'
        }, option);
    }

    _createClass(BulkSelect, [{
        key: "init",
        value: function init() {
            this.attachNodes();
            this.clickBulkCheckbox();
            this.clickRowCheckbox();
        }
    }, {
        key: "attachNodes",
        value: function attachNodes() {
            var _this$element$data = this.element.data('bulk-select'),
                body = _this$element$data.body,
                actions = _this$element$data.actions,
                replacedElement = _this$element$data.replacedElement;

            this.actions = new Node(document.getElementById(actions));
            this.replacedElement = new Node(document.getElementById(replacedElement));
            this.bulkSelectRows = document.getElementById(body).querySelectorAll('[data-bulk-select-row]');
        }
    }, {
        key: "clickBulkCheckbox",
        value: function clickBulkCheckbox() {
            var _this = this;

            // Handle click event in bulk checkbox
            this.element.on('click', function () {
                if (_this.element.attr('indeterminate') === 'indeterminate') {
                    _this.actions.addClass(_this.option.displayNoneClassName);

                    _this.replacedElement.removeClass(_this.option.displayNoneClassName);

                    _this.removeBulkCheck();

                    _this.bulkSelectRows.forEach(function (el) {
                        var rowCheck = new Node(el);
                        rowCheck.setProp('checked', false);
                        rowCheck.setAttribute('checked', false);
                    });

                    return;
                }

                _this.toggleDisplay();

                _this.bulkSelectRows.forEach(function (el) {
                    var rowCheck = new Node(el);
                    rowCheck.setProp('checked', _this.element.attr('checked'));
                    rowCheck.setAttribute('checked', _this.element.attr('checked'));
                });
            });
        }
    }, {
        key: "clickRowCheckbox",
        value: function clickRowCheckbox() {
            var _this2 = this;

            // Handle click event in checkbox of each row
            this.bulkSelectRows.forEach(function (el) {
                var rowCheck = new Node(el);
                rowCheck.on('click', function () {
                    if (_this2.element.attr('indeterminate') !== 'indeterminate') {
                        _this2.element.setProp('indeterminate', true);

                        _this2.element.setAttribute('indeterminate', 'indeterminate');

                        _this2.element.setProp('checked', true);

                        _this2.element.setAttribute('checked', true);

                        _this2.actions.removeClass(_this2.option.displayNoneClassName);

                        _this2.replacedElement.addClass(_this2.option.displayNoneClassName);
                    }

                    if (_toConsumableArray(_this2.bulkSelectRows).every(function (element) {
                        return element.checked;
                    })) {
                        _this2.element.setProp('indeterminate', false);

                        _this2.element.setAttribute('indeterminate', false);
                    }

                    if (_toConsumableArray(_this2.bulkSelectRows).every(function (element) {
                        return !element.checked;
                    })) {
                        _this2.removeBulkCheck();

                        _this2.toggleDisplay();
                    }
                });
            });
        }
    }, {
        key: "removeBulkCheck",
        value: function removeBulkCheck() {
            this.element.setProp('indeterminate', false);
            this.element.removeAttribute('indeterminate');
            this.element.setProp('checked', false);
            this.element.setAttribute('checked', false);
        }
    }, {
        key: "toggleDisplay",
        value: function toggleDisplay() {
            this.actions.toggleClass(this.option.displayNoneClassName);
            this.replacedElement.toggleClass(this.option.displayNoneClassName);
        }
    }]);

    return BulkSelect;
}();

function bulkSelectInit() {
    var bulkSelects = document.querySelectorAll('[data-bulk-select');

    if (bulkSelects.length) {
        bulkSelects.forEach(function (el) {
            var bulkSelect = new BulkSelect(el);
            bulkSelect.init();
        });
    }
};
bulkSelectInit();

$(function () {

    $(document).bind('ajaxStart', function () {

    }).bind('ajaxStop', function () {

    });
});
function run_waitMe(el, num, isHide) {
    var text = 'Processing, please wait...';
    var fontSize = '';
    var color = '#fff';
    var maxSize;
    var textPos;
    switch (num) {
        case 1:
            maxSize = '';
            textPos = 'vertical';

            break;
        case 2:
            text = '';
            maxSize = 30;
            textPos = 'vertical';
            break;
        case 3:
            maxSize = 30;
            color = '#000';
            textPos = 'horizontal';
            fontSize = '18px';
            break;
    }
    el.waitMe({
        effect: 'win8_linear',
        text: text,
        bg: 'rgba(255,255,255,0.7)',
        color: color,
        maxSize: maxSize,
        waitTime: -1,
        source: '',
        textPos: 'horizontal',
        fontSize: fontSize,
        onClose: function (el) {
            if (window.wizardValid != undefined) window.wizardValid.next();
        }
    });
    if (isHide)
        setTimeout(function () {
            el.waitMe('hide');
        }, 1200);
};
function stop_waitMe(el) {
    el.waitMe('hide');
};

$(document).ready(function () {
    window.ssdCascadingDropDownRegEvent = function (l) {
        $('.cascadingDropDown').ssdCascadingDropDown({
            nonFinalCallback: function (trigger, props, data, self) {

                if ($("." + props.group + "-" + props.target).attr("data-ready") != "yes") {
                    setTimeout(function () {
                        $("." + props.group + "-" + props.target).val($("." + props.group + "-" + props.target).attr("data-val")).attr("data-ready", "yes").trigger("change");
                    }, 120);
                }

                trigger.closest('form')
                    .find('input[type="submit"]')
                    .attr('disabled', true);

            },
            finalCallback: function (trigger, props, data) {

                if (props.isValueEmpty()) {
                    trigger.closest('form')
                        .find('input[type="submit"]')
                        .attr('disabled', true);
                } else {
                    trigger.closest('form')
                        .find('input[type="submit"]')
                        .attr('disabled', false);
                }

            }
        });
        setTimeout(function () {
            $.each(l, function (k,v) {
                $(v).val(1).trigger("change");
            });
        }, 12);
    }
    window.ssdCascadingDropDownRegEvent([".BillingAddress-CountryId", ".ShippingAddress-CountryId"]);

});
$(document).ready(function () {

    window.AddressSaveOnSuccess = function (data) {
        if (data.success == true) {
            swal({
                title: "Save Success",
                text: "Congratulations, you are save successfully!",
                type: "success",
                confirmButtonText: "Ok"
            });
            if ($(".addresses-Edit").length > 0) $(".addresses-Edit").empty();
            if (window.loadAddress != undefined) window.loadAddress();
        }
        
        else swal({
            title: "Save Failured",
            text: "Congratulations, you are save successfully!",
            type: "error",
            confirmButtonText: "Try again later!"
        });
    }
});