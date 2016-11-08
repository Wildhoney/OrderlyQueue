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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function wrap(fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function await(value) { return new AwaitValue(value); } }; }();

	exports.default = function (_ref) {

	  /**
	   * @method enqueue
	   * @param {Function} createTask
	   * @param {Object} [props]
	   * @yield {*}
	   */
	  var enqueue = function () {
	    var _ref2 = _asyncGenerator.wrap(regeneratorRuntime.mark(function _callee() {
	      var createTask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialTask;
	      var props = arguments[1];
	      var task;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              _context.prev = 0;
	              _context.next = 3;
	              return _asyncGenerator.await(createTask(props));

	            case 3:
	              task = _context.sent;


	              // Publish the result of the task to the subscription.
	              next(task);

	              // Recursively invoke the generator, passing in the props received from the last
	              // invocation.
	              _context.next = 7;
	              return;

	            case 7:
	              _context.t0 = _context.sent;
	              _context.t1 = task;
	              _context.t2 = enqueue(_context.t0, _context.t1);
	              _context.t3 = _asyncIterator(_context.t2);
	              _context.t4 = _asyncGenerator.await;
	              return _context.delegateYield(_asyncGeneratorDelegate(_context.t3, _context.t4), "t5", 13);

	            case 13:
	              _context.next = 26;
	              break;

	            case 15:
	              _context.prev = 15;
	              _context.t6 = _context["catch"](0);


	              // Task rejected the promise with a potential reason, which we'll publish to the
	              // subscription.
	              error(_context.t6);

	              // Any further invocations will simply continue from the last success.
	              _context.next = 20;
	              return;

	            case 20:
	              _context.t7 = _context.sent;
	              _context.t8 = props;
	              _context.t9 = enqueue(_context.t7, _context.t8);
	              _context.t10 = _asyncIterator(_context.t9);
	              _context.t11 = _asyncGenerator.await;
	              return _context.delegateYield(_asyncGeneratorDelegate(_context.t10, _context.t11), "t12", 26);

	            case 26:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee, this, [[0, 15]]);
	    }));

	    return function enqueue(_x, _x2) {
	      return _ref2.apply(this, arguments);
	    };
	  }();

	  // Initiate the async generator, and move the cursor to the first yield.


	  var value = _ref.value,
	      _ref$next = _ref.next,
	      next = _ref$next === undefined ? fn : _ref$next,
	      _ref$error = _ref.error,
	      error = _ref$error === undefined ? fn : _ref$error;


	  /**
	   * @method initialTask
	   * @return {Promise}
	   */
	  var initialTask = function initialTask() {
	    return Promise.resolve(value);
	  };var iterator = enqueue();
	  iterator.next();

	  /**
	   * @method add
	   * @param {Function} promiseFn
	   * @return {void}
	   */
	  var add = function add(promiseFn) {
	    iterator.next(promiseFn);
	  };

	  return { add: add };
	};

	function _asyncIterator(iterable) { if (typeof Symbol === "function") { if (Symbol.asyncIterator) { var method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { return iterable[Symbol.iterator](); } } throw new TypeError("Object is not async iterable"); }

	function _asyncGeneratorDelegate(inner, awaitWrap) { var iter = {}, waiting = false; function pump(key, value) { waiting = true; value = new Promise(function (resolve) { resolve(inner[key](value)); }); return { done: false, value: awaitWrap(value) }; } ; if (typeof Symbol === "function" && Symbol.iterator) { iter[Symbol.iterator] = function () { return this; }; } iter.next = function (value) { if (waiting) { waiting = false; return value; } return pump("next", value); }; if (typeof inner.throw === "function") { iter.throw = function (value) { if (waiting) { waiting = false; throw value; } return pump("throw", value); }; } if (typeof inner.return === "function") { iter.return = function (value) { return pump("return", value); }; } return iter; }

	/**
	 * @method fn
	 * @return {void}
	 */
	var fn = Function.prototype;

	/**
	 * @param {Object} [value]
	 * @param {Function} [next]
	 * @param {Function} [error]
	 * @return {Object}
	 */

/***/ }
/******/ ]);