'use strict';

const min = 2;
const max = 1e7;
const primes = [];

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

const t1 = new Date().getTime();
generatePrimes(min, max);
const t2 = new Date().getTime(); 
const time = Math.floor((t2 - t1) / 1000 * 100) / 100;
console.log(`Time to check prime numbers between 2 and 10^7 without worker threads: ${time}s`);