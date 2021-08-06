const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

console.log("Using string decoder");

console.log("Buffer1 with cent sign as value in byte")
const cent = Buffer.from([0xC2, 0xA2]);
console.log(cent);
console.log("Buffer1 in string")
console.log(decoder.write(cent));

console.log("Buffer2 with euro sign as value in byte")
const euro = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(euro);
console.log("Buffer2 in string")
console.log(decoder.write(euro));
console.log("\n");


console.log("Creating 0 - 255 ascii characters buffer array")
let arr = [];
for(let i = 0; i < 256; i++) {
    arr.push(i);
}
const buffArr = Buffer.from(arr);
console.log("Buffer array")
console.log(buffArr);

console.log("Decoding the buffer array");
const newArr = decoder.write(buffArr); 

console.log("type of decoded buffer array")
console.log(typeof newArr);
console.log("decoded strings")
console.log(newArr);
