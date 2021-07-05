import { createServer } from "http";
import express from "express";
import Config from "./config";

const app: express.Application = express();
const server = createServer(app);

server.listen(
    Config.port,
    () => console.log(`Server is listening on port:${Config.port}`)  
);