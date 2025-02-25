const { createSubmission } = require('./submissions.service');

const createSubmissionController = async (req, res, next) => {

    try{
        const { file_map } = req.body;
        const parsedFileMap = JSON.parse(file_map);

        const mappedFiles = {};
        req.files.forEach(file => {
            const fieldName = parsedFileMap[file.originalname];
            if (fieldName) {
                mappedFiles[fieldName] = {filename: file.filename, path: file.path};
            }
        });
        // make a record in submissions table
        // make multiple records in documents table
        const newSubmission = await createSubmission(req.body, mappedFiles);
        return res.status(200).json({message: "Submission successful", details: newSubmission});
    }catch(error){
        next(error);
    }
}

module.exports = { createSubmissionController }