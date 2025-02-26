const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        try{
            if(!req.file_list && req.body.file_list){
                req.file_list = JSON.parse(req.body.file_list);
            }
            const timeStamp = Date.now();
            const matchingFile = req.file_list?.find(f => f.original_name === file.originalname);

            const newFileName = matchingFile ? `${timeStamp}-${matchingFile.file_name}` : `${timeStamp}-${file.originalname}`;
            console.log("File Name", newFileName);

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