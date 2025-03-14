const {s3, BUCKET_NAME} = require('./s3.config');
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { generateFileName } = require('../../utils/file.utils');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



async function uploadFile(file, file_list) {
    const dir = 'uploads';
    const new_file_name = generateFileName(file, file_list);
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${dir}/${new_file_name}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        const command = new PutObjectCommand(params);
        const response = await s3.send(command);
        console.log("File uploaded successfully:", response);
        return `${dir}/${new_file_name}`;

    } catch (error) {
        throw error;
    }
}

async function getSignedUrlForFile(filePath) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: filePath, // File path in S3
        Expires: 60 * 5 // URL expiration time (in seconds, e.g., 5 minutes)
    };

    try {
        const command = new GetObjectCommand(params);
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: params.Expires });
        return signedUrl;
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw error;
    }
}



// const uploadMultipleFiles = async (files) => {
//     console.log("*********BUCKET NAME*********",BUCKET_NAME);
//     // Create an array of upload promises
//     const uploadPromises = files.map((file) => {
//         const params = {
//             Bucket: BUCKET_NAME,
//             Key: `uploads/${file.originalname}`,
//             Body: file.buffer,
//             ContentType: file.mimetype
//         };

//         return s3.upload(params).promise();
//     });

//     // Send all uploads in one request using Promise.all()
//     return Promise.all(uploadPromises);
// };


module.exports = {uploadFile, getSignedUrlForFile};