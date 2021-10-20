const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWSAccessKeyId,
	secretAccessKey: process.env.AWSSecretKey,
});

module.exports = { s3 };
