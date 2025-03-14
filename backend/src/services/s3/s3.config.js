const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();

const s3 = new S3Client({ region: process.env.AWS_REGION });


const BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = {s3, BUCKET_NAME};