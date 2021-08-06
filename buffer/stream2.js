const fs = require('fs');

const writer = fs.createWriteStream("sample.txt");
for (let i = 0; i < 100; i++) {
  writer.write(`hello, #${i}!\n`);
}
writer.on('finish', () => {
  console.log('All writes are now complete.');
});
writer.end('This is the end\n');


const reader = fs.createReadStream("sample.txt");
reader.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
});
reader.on('end', () => {
    console.log('There will be no more data.');
});


//create new file with data from sample.txt to newFile.txt
const newWriter = fs.createWriteStream("newFile.txt");
reader.pipe(newWriter);

//pipe and unpipe writable stream
const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing is now false.

pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok');  // Will not emit 'data'.
pass.resume();     // Must be called to make stream emit 'data'.




//Returns: <AsyncIterator> to fully consume the stream.
async function print(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  console.log(data);
}

print(fs.createReadStream('file')).catch(console.error);



//Using finished from stream module
const { finished } = require('stream');
const rs = fs.createReadStream('newFile.txt');

finished(rs, (err) => {
  if (err) {
    console.error('Stream failed.', err);
  } else {
    console.log('Stream is done reading.');
  }
});

rs.resume(); // Drain the stream.