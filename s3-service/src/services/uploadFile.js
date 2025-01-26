const {s3, BUCKET_NAME} = require('../config/s3.config');


const uploadFile = async (file, fileName) => {
    
    const s3FileName = `nanda/${fileName}`;
    const params = {
        Bucket: BUCKET_NAME,
        Key: s3FileName,
        Body: file.buffer,
        ContentType: file.mimetype, //requires the use of multer
    };

    try{
        const uploaded = await s3.upload(params).promise();
        return {location: uploaded.Location, key: uploaded.Key};
    }catch(error){
        console.error("S3 upload error:", error);
        throw new Error("Failed to upload file to S3");
    }
};

module.exports = uploadFile;