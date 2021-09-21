'use strict';
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const min = 2;

let primes = [];
let totalTimeTaken = 0;

function generatePrimes(start, range) {
    let isPrime = true;
    let end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i%j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

if (isMainThread) {
    const max = 1e7;
    const threadCount = +process.argv[2] || 2;

    const threads = new Set();
    console.log(`Running with ${threadCount} threads...`);
    
    const range = Math.ceil((max - min) / threadCount);
    let start = min;
    for (let i = 0; i < threadCount - 1; i++) {
        const myStart = start;
        const newWorker = new Worker(
            __filename, 
            {
                workerData: {
                    start: myStart,
                    range
                }
            }
        );
        threads.add(newWorker);
        start += range;
    }
    const workerForRemainingCalculations = new Worker(
        __filename, 
        { 
            workerData: { 
                start, 
                range: range + ((max - min + 1) % threadCount)
            }
        }
    );
    threads.add(workerForRemainingCalculations);
    for (let worker of threads) {
        worker.on(
            'error', 
            (err) => { throw err; }
        );
        worker.on(
            'exit', 
            () => {
                threads.delete(worker);
                console.log(`Thread exiting, ${threads.size} running...`);
                if (threads.size === 0) {
                    console.log(`Time to check prime numbers between 2 and 10^7 using ${threadCount} worker threads: ${totalTimeTaken}s`);
                }
            }
        );
        worker.on(
            'message', 
            (msg) => {
                totalTimeTaken = Math.max(Number(msg), totalTimeTaken);
            }
        );
    }
} else {  
    const t1 = new Date().getTime();  
    generatePrimes(workerData.start, workerData.range);
    const t2 = new Date().getTime();
    const time = Math.floor((t2 - t1) / 1000 * 100 ) / 100;
    parentPort.postMessage(time);
}
