let http = require('http');
let fs = require('fs');
let zlib = require('zlib');

let server = http.createServer(
    function (req, res) {
        let filename = req.headers.filename;
        console.log('File request received: ' + filename);
        
        req.pipe(zlib.createGunzip())
            .pipe(fs.createWriteStream(filename))
            .on('finish', function() {
                res.writeHead(201, {'Content-Type': 'text/plain'});
                res.end('That\'s it\n');
                console.log('File saved: ' + filename);
            });
    }
);
   
server.listen(3000, function () {
    console.log('Listening');
})