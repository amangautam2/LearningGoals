//Creating buffer from js Uint16array
const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// Shares memory with `arr`.
const buf = Buffer.from(arr.buffer);
console.log("Uint16array")
console.log(arr);
console.log("Buffer from Uint16array")
console.log(buf);
console.log("\n");

console.log("Changing the original Uint16Array changes the Buffer also");
arr[1] = 6000;
console.log("Updated array");
console.log(arr);
console.log("Updated buffer");
console.log(buf);
console.log("\n");


console.log("Creating buffer from buffer");
const buf1 = Buffer.from('buffer');
console.log("Buffer 1");
console.log(buf1);
const buf2 = Buffer.from(buf1);
console.log("Buffer from buffer1");
console.log(buf2);

buf1[0] = 0x61;
console.log("Converting them to string")
console.log(buf1.toString());
// Prints: auffer
console.log(buf2.toString());
// Prints: buffer
console.log("\n");



console.log("Buffer from a class instance");
class Foo {
    [Symbol.toPrimitive]() {
      return 'this is a test';
    }
}
console.log("Class Instance")
console.log(new Foo());
const buf3 = Buffer.from(new Foo(), 'utf8');
console.log("Buffer");
console.log(buf3);
console.log("\n");


console.log("Buffer from strings");
const buf4 = Buffer.from('this is a tést');

console.log("buffer")
console.log(buf4);
console.log(buf4.toString());
console.log("buffer to string in latin1");
console.log(buf4.toString('latin1'));
console.log("\n");


console.log("Copying buffers");
const buf5 = Buffer.allocUnsafe(26);
const buf6 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0; i < 26; i++) {
  // 97 is the decimal ASCII value for 'a'.
  buf5[i] = i + 97;
}
console.log("Buffer1 with a-z ");
console.log(buf5);

console.log("Buffer2");
console.log(buf6);

console.log("Copy `buf1` bytes 16 through 19 into `buf2` starting at byte 8 of `buf2`");
buf5.copy(buf6, 8, 16, 20);
// This is equivalent to:
// buf2.set(buf1.subarray(16, 20), 8);

console.log(buf6.toString('ascii', 0, 25));
// Prints: !!!!!!!!qrst!!!!!!!!!!!!!