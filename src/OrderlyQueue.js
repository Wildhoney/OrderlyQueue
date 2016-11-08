/**
 * @method fn
 * @return {void}
 */
const fn = Function.prototype;

/**
 * @param {Object} [value]
 * @param {Function} [next]
 * @param {Function} [error]
 * @return {Object}
 */
export default function({ value, next = fn, error = fn }) {

    /**
     * @method initialTask
     * @return {Promise}
     */
    const initialTask = () => Promise.resolve(value);

    /**
     * @method enqueue
     * @param {Function} createTask
     * @param {Object} [props]
     * @yield {*}
     */
    async function* enqueue(createTask = initialTask, props) {

        try {

            // Invoke the next task, passing in either the default props, or the props from the
            // previous task.
            const task = await createTask(props);

            // Publish the result of the task to the subscription.
            next(task);

            // Recursively invoke the generator, passing in the props received from the last
            // invocation.
            yield* enqueue(yield, task);

        } catch (reason) {

            // Task rejected the promise with a potential reason, which we'll publish to the
            // subscription.
            error(reason);

            // Any further invocations will simply continue from the last success.
            yield* enqueue(yield, props);

        }

    }

    // Initiate the async generator, and move the cursor to the first yield.
    const iterator = enqueue();
    iterator.next();

    /**
     * @method add
     * @param {Function} promiseFn
     * @return {void}
     */
    const add = promiseFn => {
        iterator.next(promiseFn);
    };

    return { add };

}
