const { createServer } = require('http');

const {
    executionAsyncId,
    executionAsyncResource,
    createHook
} = require('async_hooks');

const sym = Symbol('state'); 

createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        const cr = executionAsyncResource();
        if (cr) {
            resource[sym] = cr[sym];
        }
    }
}).enable();

const server = createServer(function(req, res) {
    executionAsyncResource()[sym] = { 
        state: req.url 
    };

    setTimeout(function() {
        res.end(
            JSON.stringify(executionAsyncResource()[sym])
        );
    }, 100);
}).listen(3000);