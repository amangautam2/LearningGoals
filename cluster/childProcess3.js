let child_process = require('child_process');
let net = require('net');
let path = require('path')

function multiplexChannels(sources, destination) {
    let totalChannels = sources.length;
    for(let i = 0; i < sources.length; i++) {
        sources[i].on('readable', function(i) { 
            let chunk;

            while((chunk = this.read()) !== null) {

                let outBuff = Buffer(1 + 4 + chunk.length);
                outBuff.writeUInt8(i, 0); 
                outBuff.writeUInt32BE(chunk.length, 1);
                chunk.copy(outBuff, 5);
                console.log('Sending packet to channel: ' + i);
                destination.write(outBuff); 
            }
        }.bind(sources[i], i))
            .on('end', function() { 
                if(--totalChannels === 0) {
                    destination.end();
                }
            });
    }
}


let socket = net.connect(8080, function() {
    let child = child_process.fork(
        process.argv[2],
        process.argv.slice(3) ,
        {
            silent: true
        }
    );
    multiplexChannels([child.stdout, child.stderr], socket);
});