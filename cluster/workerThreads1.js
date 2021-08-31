/**
 * The worker_threads module enables the use of threads that execute JavaScript in parallel.
 * Workers (threads) are useful for performing CPU-intensive JavaScript operations. 
 * They will not help much with I/O-intensive work. 
 * Node.js’s built-in asynchronous I/O operations are more efficient than Workers can be.
 * Unlike child_process or cluster, worker_threads can share memory. 
 * They do so by transferring ArrayBuffer instances or sharing SharedArrayBuffer instances.
 */

 const wt = require('worker_threads');

const Worker = wt.Worker;

if (wt.isMainThread) {
    // This re-loads the current file inside a Worker instance.
    new Worker(__filename);
} else {
    console.log('Inside Worker!');
    console.log(isMainThread);  // Prints 'false'.
}

function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
        workerData: script
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
    });
};

parseJSAsync("Hello there").then( res => console.log(res)).catch(error => console.error(error));

