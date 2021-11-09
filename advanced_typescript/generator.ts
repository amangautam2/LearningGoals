//function * is the syntax used to create a generator function
// Calling a generator function returns a generator object
//The generator object just follows the iterator interface 
//(i.e. the next, return and throw functions)


//creating infinite iterator using generator 

function* infiniteSequence() {
    var i = 0;
    while(true) {
        yield i++;
    }
}
var iterator = infiniteSequence();
while (true) {
    console.log(iterator.next()); // { value: xxxx, done: false } forever and ever
}



function* idMaker(){
  let index = 0;
  while(index < 3)
    yield index++;
}

let gen = idMaker();

console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { done: true }


//It essentially allows a function to pause its execution and pass control (fate) of the remainder of the function execution to the caller
//A generator function does not execute when you call it
//It just creates a generator object

function* generator(){
    console.log('Execution started');
    yield 0;
    console.log('Execution resumed');
    yield 1;
    console.log('Execution resumed');
}
var iterator = generator();
console.log('Starting iteration'); // This will execute before anything in the generator function body executes
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: undefined, done: true }



function* foo() {
  if (Math.random() < 0.5) yield 100;
  return "Finished!";
}
let iter = foo();
let curr = iter.next();
if (curr.done) {
  // TypeScript 3.5 and prior thought this was a 'string | number'.
  // It should know it's 'string' since 'done' was 'true'!
  curr.value;
}


function* bar() {
  let x: { hello(): void } = yield;
  x.hello();
}
let iter = bar();
iter.next();
iter.next(123); // oops! runtime error!


function* foo() {
  let x: string = yield;
  console.log(x.toUpperCase());
}
let x = foo();
x.next(); // first call to 'next' is always ignored
x.next(42); // error! 'number' is not assignable to 'string'



/**
 * - yields numbers
 * - returns strings
 * - can be passed in booleans
 */
function* counter(): Generator<number, string, boolean> {
  let i = 0;
  while (true) {
    if (yield i++) {
      break;
    }
  }
  return "done!";
}
var iter = counter();
var curr = iter.next();
while (!curr.done) {
  console.log(curr.value);
  curr = iter.next(curr.value === 5);
}
console.log(curr.value.toUpperCase());
// prints:
//
// 0
// 1
// 2
// 3
// 4
// 5
// DONE!