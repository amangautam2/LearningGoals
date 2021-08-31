/**
 * The child_process module provides the ability to spawn child processes, 
 * This capability is primarily provided by the child_process.spawn() function
 */


const { spawn } = require('child_process');

const child = spawn('pwd');

child.on('exit', function (code, signal) {
    console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
});

child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
});
  
child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
});



