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

# Usage

```javascript
import Queue from 'orderly-queue';

const queue = Queue();

queue.add(() => Promise.resolve('Uno'));
queue.add(() => Promise.resolve('Dos'));
queue.add(() => Promise.resolve('Tres'));
```
