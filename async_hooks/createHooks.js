const async_hooks = require('async_hooks');
const fs = require("fs");


class MyAsyncCallbacks {
    init(asyncId, type, triggerAsyncId, resource) { }
    destroy(asyncId) {}
}

class MyAddedCallbacks extends MyAsyncCallbacks {
    before(asyncId) { }
    after(asyncId) { }
}
  
const asyncHook = async_hooks.createHook(new MyAddedCallbacks());

asyncHook.enable();

console.log(asyncHook.asyncId);

asyncHook.disable();



const asyncHook2 = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
      const eid = async_hooks.executionAsyncId();
      fs.writeSync(
        1, `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
    }
}).enable();
  
require('net').createServer((conn) => {}).listen(8080);

