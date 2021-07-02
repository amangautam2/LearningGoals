const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

try {
    /* 
        It Throws and crashes Node.js (if not inside try catch)
        as there is no listners for error events 
    */
    myEmitter.emit('error', 
        new Error('Not found')
    );
} catch(error) {
    console.error(error.message);
}

myEmitter.on('error', (error) => {
    console.error(error.message);
});
  
myEmitter.emit('error', 
    new Error('Error found')
);

//Removing listners

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('error1', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('error1', callbackA);

myEmitter.on('error1', callbackB);

// CallbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('error1');


// Now listener callbackB will not be called
myEmitter.emit('error1');
