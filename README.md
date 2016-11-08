# Orderly Queue

![Bus Queue](/media/bus-queue.jpg)

> Implementation of a promise-based FIFO queuing system using ES2017 async generators.

![Travis](http://img.shields.io/travis/Wildhoney/OrderlyQueue.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/orderly-queue.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

> **npm:** `npm i orderly-queue -S`<br />
> **Babel:** [`babel-plugin-syntax-async-generators`](https://www.npmjs.com/package/babel-plugin-syntax-async-generators)

* Takes a function that returns a promise (or `Promise.all`)
* Invokes the promise and `yield`s the eventual result
* Awaits the completion of the task before beginning the next
* Implements a pseudo-observable for `next` and `error`

# Usage

```javascript
import Queue from 'orderly-queue';

const queue = Queue({ value: ['Blueberries'], next: console.log });

queue.add(fruits => Promise.resolve([...fruits, 'Apples']));
queue.add(fruits => Promise.resolve([...fruits, 'Bananas']));
queue.add(fruits => Promise.resolve([...fruits, 'Raspberries']));

// > ['Blueberries']
// > ['Blueberries', 'Apples']
// > ['Blueberries', 'Apples', 'Bananas']
// > ['Blueberries', 'Apples', 'Bananas', 'Raspberries']
```

Each task will wait before the completion of the current task, meaning you can safely assume the order of `fruits` no matter how long it takes for a single task to complete.

Any errors that are raised will be passed to the `error` function, but the items in the queue will continue to be invoked one-at-a-time passing in the `props` from the last successful invocation.

```javascript
import Queue from 'orderly-queue';

const queue = Queue({ value: ['Blueberries'], next: console.log, error: console.log });

queue.add(fruits => Promise.resolve([...fruits, 'Apples']));
queue.add(fruits => Promise.reject('Fruitless...'));
queue.add(fruits => Promise.resolve([...fruits, 'Bananas']));
queue.add(fruits => Promise.resolve([...fruits, 'Raspberries']));

// > ['Blueberries']
// > ['Blueberries', 'Apples']
// > Fruitless...
// > ['Blueberries', 'Apples', 'Bananas']
// > ['Blueberries', 'Apples', 'Bananas', 'Raspberries']
```
