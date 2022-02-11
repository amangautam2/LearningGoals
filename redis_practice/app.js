const express = require('express');
const axios = require('axios');
const redis = require('redis');
const redisClient = redis.createClient(6379);

const app = express();
const port = process.env.PORT || 8080;

//adding mock api url
const mockApiUrl = "https://jsonplaceholder.typicode.com/comments/";


const fetchMiddleware = async (req, res) => {
    const id = req?.params?.id;
    if (!id) res.status(400).send("Id not provided");

    const response = await axios.get(`${mockApiUrl}?id=${id}`);
    const comment = response?.data;
    if (!comment.length) res.status(404).send(`Comment not found`);
    res.status(200).send(comment);
}

const fetchMiddlewareCached = async (req, res) => {
    const id = req?.params?.id;
  
    redisClient.get(id, async (err, data) => {
        if(data) {
            console.log("Comment successfully retrieved from cache");
            res.status(200).send(JSON.parse(data));
        } 
        const response = await axios.get(`${mockApiUrl}?id=${id}`);
        const comment = response?.data;
        redisClient.setex(id, 600, JSON.stringify(comment));
        console.log("Comment successfully retrieved from the API");
        res.status(200).send(comment);
    })
}

app.get('/comments/:id', fetchMiddleware);

app.get('/cache/comment/:id', fetchMiddlewareCached);

app.listen(port, console.log(`Server is running at port ${port}`));
