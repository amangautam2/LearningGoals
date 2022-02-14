const awsSdk = require('aws-sdk');
const fs = require('fs');

export function uploadFile(filename, fileDirectoryPath) {
    awsSdk.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY    
    });
    const s3 = new awsSdk.S3();

    return new Promise((resolve, reject) => {
        fs.readFile(fileDirectoryPath.toString(), (err, data) => {
            if (err) reject(err);
            s3.putObject({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: filename,
                Body: data,
                ACL: 'public-read'
            },  (err, data) => {
                if (err) reject(err);
                resolve("succesfully uploaded");
            });
        });
    });
}