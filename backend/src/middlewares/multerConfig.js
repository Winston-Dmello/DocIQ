const multer = require('multer');
const fs = require('fs');
const path = require('path');


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        try{
            if(!req.file_list && req.body.file_list){
                req.file_list = JSON.parse(req.body.file_list);
            }
            const separator = "$#$!";
            const timeStamp = Date.now().toISOString().split('T')[1];
            const originalName = file.originalname || `unknown_${timeStamp}.file`; // Ensure a valid filename
            const matchingFile = req.file_list?.find(f => f.original_name === originalName);

            const newFileName = matchingFile 
                ? `${timeStamp}-${separator}${matchingFile.file_name}` 
                : `${timeStamp}-${originalName}`;
            console.log("Multer: ", newFileName);

            if(!req.file_paths){
                req.file_paths = [];
            }
            req.file_paths.push(`uploads/${newFileName}`);
            cb(null, newFileName);
        }catch(error){
            cb(error, null);
        }
    }
});

const upload = multer({storage: storage});

module.exports = upload;