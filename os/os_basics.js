const os = require('os');

let currentOS = {
    name: os.type(),
    architecture: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version()
};

console.log(currentOS);

console.log(`The server has been up for ${os.uptime()} seconds.`);

console.log(os.userInfo());


//Getting the server hardware information

let totalMem = os.totalmem();
console.log(totalMem);

let freeMem = os.freemem();
console.log(freeMem);

const { model, speed } = os.cpus()[0];

console.log(`Model: ${model}`);
console.log(`Speed (MHz): ${speed}`);

console.log(os.networkInterfaces());