const express = require('express');
const axios = require('axios');

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

app.get('/comments/:id', fetchMiddleware);

app.listen(port, console.log(`Server is running at port ${port}`));
