const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const asyncHandler = require('./handler');
const fileController = require('./controller');
const port = process.env.PORT || 8080;

const app = express();

const localPath = './files';
const storage = multer.diskStorage({
    destination: localPath,
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err);
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        })
    } 
});

app.use(multer({ storage }).single('file'));

app.get('/api/download', asyncHandler(fileController.download));
app.post('/api/upload', asyncHandler(fileController.upload));

app.listen(port, console.log(`Server is listening on port ${port}`));

