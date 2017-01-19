'use strict';

function __asyncGen(g) {
  var q = [],
      T = ["next", "throw", "return"],
      I = {};for (var i = 0; i < 3; i++) {
    I[T[i]] = a.bind(0, i);
  }I[Symbol ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol()) : "@@asyncIterator"] = function () {
    return this;
  };function a(t, v) {
    return new Promise(function (s, j) {
      q.push([s, j, v, t]);q.length === 1 && c(v, t);
    });
  }function c(v, t) {
    try {
      var r = g[T[t | 0]](v),
          w = r.value && r.value.__await;w ? Promise.resolve(w).then(c, d) : n(r, 0);
    } catch (e) {
      n(e, 1);
    }
  }function d(e) {
    c(e, 1);
  }function n(r, s) {
    q.shift()[s](r);q.length && c(q[0][2], q[0][3]);
  }return I;
}

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
var orderlyQueue = function () {
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
  };

  /**
   * @method queue
   * @param {Function} createTask
   * @param {Object} [props]
   * @yield {void}
   */
  function queue(createTask, props) {
    return __asyncGen(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return { __await: createTask(props) };

            case 3:
              result = _context.sent;


              // Publish the resolved value of the task to the subscription.
              next(result);

              // Recursively invoke the generator, passing in the props received from the last
              // invocation.
              _context.t0 = queue;
              _context.next = 8;
              return result;

            case 8:
              _context.t1 = _context.sent;
              _context.t2 = result;
              return _context.delegateYield((0, _context.t0)(_context.t1, _context.t2), 't3', 11);

            case 11:
              _context.next = 22;
              break;

            case 13:
              _context.prev = 13;
              _context.t4 = _context['catch'](0);


              // Publish the rejected value of the task to the subscription.
              error(_context.t4);

              // Any further invocations will simply continue from the last successful task, which
              // allows recovery from any promise rejections.
              _context.t5 = queue;
              _context.next = 19;
              return _context.t4;

            case 19:
              _context.t6 = _context.sent;
              _context.t7 = props;
              return _context.delegateYield((0, _context.t5)(_context.t6, _context.t7), 't8', 22);

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 13]]);
    })());
  }

  // Initiate the async generator, and move the cursor to the first yield.
  var iterator = queue(initialTask);
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

module.exports = orderlyQueue;
