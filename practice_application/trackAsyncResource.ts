import asyncHooks from "async_hooks";
import fs from "fs";
import Config from "./config";

const fileName = Config.ASYNC_RESOURCE_FILE_NAME;

const syncConsole = (data) => {
    let resource = '';
    if (data.resource) {
        for(const [key, value] of Object.entries(data.resource)) {
            resource += `${key} : ${value}; `  
        }
    }

    fs.appendFileSync(
        fileName, 
        `
        state: ${data.state} 
        execution Async Id: ${asyncHooks.executionAsyncId()}
        async Id: ${data.asyncId}
        type: ${data.type}
        trigger async id: ${data.triggerAsyncId}
        resource: ${resource}
        
        `
    );
};

const asyncHook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        const data = {
            state: 'init',
            asyncId,
            type,
            triggerAsyncId,
            resource
        }
        syncConsole(data);
    },
    before(asyncId) {
        const data = {
            state: 'before',
            asyncId
        }
        syncConsole(data);
    },
    after(asyncId) {
        const data = {
            state: 'after',
            asyncId
        }
        syncConsole(data);
    },
    destroy(asyncId) {
        const data = {
            state: 'destroy',
            asyncId
        }
        syncConsole(data);
    }
});

export default asyncHook;