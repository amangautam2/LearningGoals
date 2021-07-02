const async_hooks = require("async_hooks");
const fs = require("fs");

async_hooks.createHook({

    init(asyncId, type, triggerAsyncId) {
        const eid = async_hooks.executionAsyncId();
       
        fs.writeSync(
            1,
            `${type}(${asyncId}):` + ` trigger: ${triggerAsyncId} execution: ${eid}\n`
        );
    },
    before(asyncId) {
        fs.writeFileSync(
            'log.out',
            `before:  ${asyncId}\n`, 
            { flag: 'a' }
        );
    },
    after(asyncId) {
        fs.writeFileSync(
            'log.out',
            `after:  ${asyncId}\n`, 
            { flag: 'a' }
        );
    },
    destroy(asyncId) {
        fs.writeFileSync(
            'log.out',
            `destroy:  ${asyncId}\n`, 
            { flag: 'a' }
        );
    },
}).enable();

require('net').createServer(
    () => {}
).listen(3000, 
    () => {
    setTimeout(() => {
        console.log('>>>', async_hooks.executionAsyncId());
    }, 10);
});