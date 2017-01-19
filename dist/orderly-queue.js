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
const fn = Function.prototype;

/**
 * @method message
 * @param {String} message
 */
const message = message => {
  return `OrderlyQueue: ${ message }.`;
};

/**
 * @constant defaultOptions
 * @type {Object}
 */
const defaultOptions = { value: null, next: fn, error: fn };

/**
 * @param {Object} [value = null]
 * @param {Function} [next = Function.prototype]
 * @param {Function} [error = Function.prototype]
 * @return {Object}
 */
var orderlyQueue = function ({ value = null, next = fn, error = fn } = defaultOptions) {

  /**
   * Initial task the yields the value that was passed in upon instantiation.
   *
   * @method initialTask
   * @return {Promise}
   */
  const initialTask = () => Promise.resolve(value);

  /**
   * @method queue
   * @param {Function} createTask
   * @param {Object} [props]
   * @yield {void}
   */
  function queue(createTask, props) {
    return __asyncGen(function* () {

      try {

        // Invoke the next task, passing in either the default props, or the props from the
        // previous task, and awaits for its promise to be resolved.
        const result = yield { __await: createTask(props) };

        // Publish the resolved value of the task to the subscription.
        next(result);

        // Recursively invoke the generator, passing in the props received from the last
        // invocation.
        yield* queue((yield result), result);
      } catch (reason) {

        // Publish the rejected value of the task to the subscription.
        error(reason);

        // Any further invocations will simply continue from the last successful task, which
        // allows recovery from any promise rejections.
        yield* queue((yield reason), props);
      }
    }());
  }

  // Initiate the async generator, and move the cursor to the first yield.
  const iterator = queue(initialTask);
  iterator.next();

  /**
   * @method process
   * @param {Function} promiseFn
   * @return {Promise}
   */
  const process = promiseFn => {

    if (typeof promiseFn !== 'function') {
      throw new Error(message('Passed in task to `queue` must be a function that yields a promise'));
    }

    return iterator.next(promiseFn);
  };

  return { process, abort: () => iterator.return() };
};

module.exports = orderlyQueue;
