const uploadFile = require('./uploadFileService');
const getFileLink = requrie('./getFileService');

const upload = async (req, res) => {
    let response = await uploadFile(req?.file?.originalname, req?.file?.path);
    res.send(response);
    res.end();
}

const download = async (req, res) => {
    let response = await getFileLink(req?.query?.filename);
    res.send(response);
    res.end();
}

export { upload, download }