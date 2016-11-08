import test from 'ava';
import { spy } from 'sinon';
import Queue from '../src/OrderlyQueue';

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

    queue.add(increment);
    queue.add(increment);
    queue.add(increment);

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

test('It should be able to handle errors;', t => {

    const { queue, increment, throwError, next, error, reason } = t.context;

    queue.add(increment);
    queue.add(increment);
    queue.add(increment);
    queue.add(throwError);
    queue.add(throwError);
    queue.add(increment);
    queue.add(increment);
    queue.add(throwError);
    queue.add(increment);

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
