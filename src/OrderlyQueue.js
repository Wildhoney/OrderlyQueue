// const delay = () => {
//
//     return new Promise(resolve => {
//
//         setTimeout(() => resolve(Math.random()), 2000);
//
// });

// };

/**
 * @constant initialTask
 * @type {Function}
 */
const initialTask = () => Promise.resolve();

/**
 * @return {Object}
 */
export default function() {

    /**
     * @method enqueue
     * @param {Function} createTask
     * @yield {*}
     */
    async function* enqueue (createTask = initialTask) {
        yield* enqueue(yield await createTask());
    }

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
