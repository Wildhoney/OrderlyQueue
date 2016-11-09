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
    async function* queue(createTask = initialTask, props) {

        try {

            // Invoke the next task, passing in either the default props, or the props from the
            // previous task, and awaits for its promise to be resolved.
            const task = await createTask(props);

            // Publish the resolved value of the task to the subscription.
            next(task);

            // Recursively invoke the generator, passing in the props received from the last
            // invocation.
            yield* queue(yield task, task);

        } catch (reason) {

            // Publish the rejected value of the task to the subscription.
            error(reason);

            // Any further invocations will simply continue from the last successful task, which
            // allows recovery from any promise rejections.
            yield* queue(yield reason, props);

        }

    }

    // Initiate the async generator, and move the cursor to the first yield.
    const iterator = queue();
    iterator.next();

    /**
     * @method process
     * @param {Function} promiseFn
     * @return {Promise}
     */
    const process = promiseFn => {
        return iterator.next(promiseFn);
    };

    return { process, stop: () => iterator.return() };

}
