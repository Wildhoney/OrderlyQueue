import test from 'ava';
import { spy } from 'sinon';
import Queue from '../src/orderly-queue';

test.beforeEach(t => {

    const next = t.context.next = spy();
    const error = t.context.error = spy();
    const reason = t.context.reason = 'Uh-oh!';

    t.context.increment = value => Promise.resolve(value + 1);
    t.context.throwError = value => Promise.reject(reason);

    t.context.queue = new Queue({ value: 0, next, error });

});

test('It should be able to process tasks one-by-one;', t => {

    const { queue, increment, next } = t.context;

    queue.process(increment).then(model => t.deepEqual(model, { value: 1, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 2, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 3, done: false }));

    return new Promise(resolve => {

        setTimeout(() => {

            t.is(next.callCount, 4);
            t.true(next.calledWith(0));
            t.true(next.calledWith(1));
            t.true(next.calledWith(2));
            t.true(next.calledWith(3));

            resolve();

        });

    });

});

test('It should be able to process tasks one-by-one using async functions;', async t => {

    const { queue, increment, next } = t.context;

    t.deepEqual(await queue.process(increment), { value: 1, done: false });
    t.deepEqual(await queue.process(increment), { value: 2, done: false });
    t.deepEqual(await queue.process(increment), { value: 3, done: false });

    t.is(next.callCount, 4);
    t.true(next.calledWith(0));
    t.true(next.calledWith(1));
    t.true(next.calledWith(2));
    t.true(next.calledWith(3));

});

test('It should be able to handle errors;', t => {

    const { queue, increment, throwError, next, error, reason } = t.context;

    queue.process(increment).then(model => t.deepEqual(model, { value: 1, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 2, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 3, done: false }));
    queue.process(throwError).then(model => t.deepEqual(model, { value: reason, done: false }));
    queue.process(throwError).then(model => t.deepEqual(model, { value: reason, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 4, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 5, done: false }));
    queue.process(throwError).then(model => t.deepEqual(model, { value: reason, done: false }));
    queue.process(increment).then(model => t.deepEqual(model, { value: 6, done: false }));

    return new Promise(resolve => {

        setTimeout(() => {

            t.is(next.callCount, 7);
            t.is(error.callCount, 3);
            t.true(next.calledWith(0));
            t.true(next.calledWith(1));
            t.true(next.calledWith(2));
            t.true(next.calledWith(3));
            t.true(error.calledWith(reason));
            t.true(next.calledWith(4));
            t.true(next.calledWith(5));
            t.true(next.calledWith(6));

            resolve();

        });

    });

});

test('It should be able to abort the generator when invoking `abort`;', t => {

    const { queue, increment, next } = t.context;

    queue.process(increment);
    queue.process(increment);
    queue.abort();
    queue.process(increment);

    return new Promise(resolve => {

        setTimeout(() => {

            t.is(next.callCount, 3);
            t.true(next.calledWith(0));
            t.true(next.calledWith(1));
            t.true(next.calledWith(2));
            t.falsy(next.calledWith(3));

            resolve();

        });

    });

});

test('It should be able to throw an error when a non-function has been passed in;', t => {

    const errorMessage = 'OrderlyQueue: Passed in task to `queue` must be a function that yields a promise.';
    t.throws((() => t.context.queue.process('task')), errorMessage);

});
