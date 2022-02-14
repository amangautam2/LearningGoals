const awsCloudFront = require('aws-cloudfront-sign/lib/cloudfrontUtil');

export function getFileLink(filename) {
    return new Promise(function (resolve, reject) {
        const options = { 
            keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID, 
            privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH 
        };
        const signedUrl = awsCloudFront.getSignedUrl(process.env.CLOUDFRONT_URL + filename, options);
        resolve(signedUrl);
    });
}