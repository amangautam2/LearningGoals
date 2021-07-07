import { createServer } from "http";
import express from "express";
import Config from "./config";
import asyncHook from "./trackAsyncResource";

const app: express.Application = express();
const server = createServer(app);

asyncHook.enable(); 

server.listen(
    Config.PORT,
    () => console.log(`Server is listening on port:${Config.PORT}`)  
);
