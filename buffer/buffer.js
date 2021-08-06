// Creates a Buffer of length 10,
// filled with bytes which all have the value `1`.
const buf1 = Buffer.alloc(10, 1);
console.log("Buffer of length 10 with all 1");
console.log(buf1);
console.log('\n');

// Creates an uninitialized buffer of length 10.
// This is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be
// overwritten using fill(), write(), or other functions that fill the Buffer's
// contents.
const buf2 = Buffer.allocUnsafe(10);
console.log("Buffer of length 10 with random prev data");
console.log(buf2);
console.log('\n');


let charArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k'];
for(let i = 0; i < 10; i++) {
    buf2.fill(charArray[i], i, i+1);
}
console.log("Buffer of length 10 with a-k characters");
console.log(buf2);
console.log('\n');


const buf3 = Buffer.alloc(10, 'hello', 'base64');
console.log("Buffer of length 10 with hello filled in base64 encoding");
console.log(buf3);
console.log('\n');



// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3]);
console.log("Buffer from [1, 2, 3]");
console.log(buf4);
console.log('\n');

const buf5 = Buffer.from('1234');
const buf6 = Buffer.from('0123');

console.log("buffer 1:");
console.log(buf5);
console.log("buffer 2:");
console.log(buf6);
console.log("Comparing 1 and 2 buffers using buffer1.compare(buffer2)");
console.log("If 1 buffer1 greater, 0 means same and -1 buffer2 is greater");
console.log(buf5.compare(buf6));
console.log("\n");

console.log("Adding those two buffers in an array");
const arr = [buf5, buf6];
console.log(arr);
console.log("\n");

console.log("Sorted buffer array");
console.log(arr.sort(Buffer.compare));
console.log("\n");


//concatenate buffers
const buf6 = Buffer.alloc(10);
const buf7 = Buffer.alloc(14);
const buf8 = Buffer.alloc(18);
const totalLength = buf6.length + buf7.length + buf8.length;

console.log(totalLength);
// Prints: 42

const bufA = Buffer.concat([buf6, buf7, buf8], totalLength);

console.log(bufA);
// Prints: <Buffer 00 00 00 00 ...>
console.log(bufA.length);