import { createServer } from "http";
import express from "express";
import Config from "./config";
import asyncHook from "./trackAsyncResource";
import { createWriteStream, createReadStream } from "fs";

const app: express.Application = express();


app.get('', (req, res) => {
    const { text } = req.query;
    if(!text) {
        res.send("No text in query found");
    }

    const writer = createWriteStream("text.txt");
    writer.write(text);
    writer.on("error", error => {
        console.error(error);
    });


    //pipe read stream to response stream
    let data = '';
    const reader = createReadStream("text.txt");
    //reader.pipe(res);
    reader.on("data", chunk => {
        data += chunk;
    })
    reader.on("end", () => {
        res.send(data);
    });
    reader.on("error", error => {
        console.error(error);
    });
})


const server = createServer(app);
asyncHook.enable(); 

server.listen(
    Config.PORT,
    () => console.log(`Server is listening on port:${Config.PORT}`)  
);
