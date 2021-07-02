const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();



//This shows that event emitter class works synchronously

console.log("Before any event");

myEmitter.on('event', () => {
      console.log('Event 1 occurred!');
});

console.log("After event 1");

myEmitter.on('event', () => {
    console.log('Event 2 occurred!');
});

myEmitter.on('event', () => {
    console.log('Event 3 occurred!');
});

myEmitter.emit('event');

console.log("After all events");
console.log();


//  Passing arguments to emit function
/*
    Also this objects do not refer to evenEmitter object 
    while using arrow functions as callback
*/

myEmitter.on('sum', function (a, b) {
    console.log(`sum: ${a+b}`);
    console.log(`event counts: ${this._eventsCount}`);
});

myEmitter.on('sum', (a, b) => {
    console.log(`sum: ${a+b}`);
    console.log(this);
});

myEmitter.emit('sum', 3, 5);
console.log();


/**
 * once events are only emitted one time unlike on events
 */

let i = 0;

myEmitter.once('printIndEvent', () => {
    console.log(`index: ${++i}`);
});

myEmitter.emit('printIndEvent');
// Prints: 1

myEmitter.emit('printIndEvent');
// Ignored
console.log();
