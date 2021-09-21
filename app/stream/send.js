let fs = require('fs');
let zlib = require('zlib');
let http = require('http');
let path = require('path');

let file = process.argv[2];
let server = process.argv[3];

let options = {
    hostname: server,
    port: 3000,
    path: '/',
    method: 'PUT', 
    headers: {
        filename: path.basename(file),
        'Content-Type': 'application/octet-stream' ,
        'Content-Encoding': 'gzip'
    }
};