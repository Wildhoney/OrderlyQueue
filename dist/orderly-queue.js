module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function wrap(fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function await(value) { return new AwaitValue(value); } }; }();

exports.default = function () {

  /**
   * @method queue
   * @param {Function} createTask
   * @param {Object} [props]
   * @yield {void}
   */
  var queue = function () {
    var _ref2 = _asyncGenerator.wrap(regeneratorRuntime.mark(function _callee(createTask, props) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _asyncGenerator.await(createTask(props));

            case 3:
              result = _context.sent;


              // Publish the resolved value of the task to the subscription.
              next(result);

              // Recursively invoke the generator, passing in the props received from the last
              // invocation.
              _context.next = 7;
              return result;

            case 7:
              _context.t0 = _context.sent;
              _context.t1 = result;
              _context.t2 = queue(_context.t0, _context.t1);
              _context.t3 = _asyncIterator(_context.t2);
              _context.t4 = _asyncGenerator.await;
              return _context.delegateYield(_asyncGeneratorDelegate(_context.t3, _context.t4), 't5', 13);

            case 13:
              _context.next = 26;
              break;

            case 15:
              _context.prev = 15;
              _context.t6 = _context['catch'](0);


              // Publish the rejected value of the task to the subscription.
              error(_context.t6);

              // Any further invocations will simply continue from the last successful task, which
              // allows recovery from any promise rejections.
              _context.next = 20;
              return _context.t6;

            case 20:
              _context.t7 = _context.sent;
              _context.t8 = props;
              _context.t9 = queue(_context.t7, _context.t8);
              _context.t10 = _asyncIterator(_context.t9);
              _context.t11 = _asyncGenerator.await;
              return _context.delegateYield(_asyncGeneratorDelegate(_context.t10, _context.t11), 't12', 26);

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 15]]);
    }));

    return function queue(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Initiate the async generator, and move the cursor to the first yield.


  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? null : _ref$value,
      _ref$next = _ref.next,
      next = _ref$next === undefined ? fn : _ref$next,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? fn : _ref$error;

  /**
   * Initial task the yields the value that was passed in upon instantiation.
   *
   * @method initialTask
   * @return {Promise}
   */
  var initialTask = function initialTask() {
    return Promise.resolve(value);
  };var iterator = queue(initialTask);
  iterator.next();

  /**
   * @method process
   * @param {Function} promiseFn
   * @return {Promise}
   */
  var process = function process(promiseFn) {

    if (typeof promiseFn !== 'function') {
      throw new Error(message('Passed in task to `queue` must be a function that yields a promise'));
    }

    return iterator.next(promiseFn);
  };

  return { process: process, abort: function abort() {
      return iterator.return();
    } };
};

function _asyncIterator(iterable) { if (typeof Symbol === "function") { if (Symbol.asyncIterator) { var method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { return iterable[Symbol.iterator](); } } throw new TypeError("Object is not async iterable"); }

function _asyncGeneratorDelegate(inner, awaitWrap) { var iter = {}, waiting = false; function pump(key, value) { waiting = true; value = new Promise(function (resolve) { resolve(inner[key](value)); }); return { done: false, value: awaitWrap(value) }; } ; if (typeof Symbol === "function" && Symbol.iterator) { iter[Symbol.iterator] = function () { return this; }; } iter.next = function (value) { if (waiting) { waiting = false; return value; } return pump("next", value); }; if (typeof inner.throw === "function") { iter.throw = function (value) { if (waiting) { waiting = false; throw value; } return pump("throw", value); }; } if (typeof inner.return === "function") { iter.return = function (value) { return pump("return", value); }; } return iter; }

/**
 * @method fn
 * @return {void}
 */
var fn = Function.prototype;

/**
 * @method message
 * @param {String} message
 */
var message = function message(_message) {
  return 'OrderlyQueue: ' + _message + '.';
};

/**
 * @constant defaultOptions
 * @type {Object}
 */
var defaultOptions = { value: null, next: fn, error: fn };

/**
 * @param {Object} [value = null]
 * @param {Function} [next = Function.prototype]
 * @param {Function} [error = Function.prototype]
 * @return {Object}
 */

/***/ }
/******/ ]);