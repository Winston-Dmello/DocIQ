const multer = require('multer');
const fs = require('fs');
const path = require('path');


// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         try{
//             if(!req.file_list && req.body.file_list){
//                 req.file_list = JSON.parse(req.body.file_list);
//             }
//             const separator = "$$$";
//             const date = new Date().toISOString().split('T')[0];
//             const originalExt = path.extname(file.originalname); // Extract extension
//             const originalName = path.basename(file.originalname, originalExt) || `unknown_${date}`;
               
//             const matchingFile = req.file_list?.find(f => f.original_name === file.originalname);
            
//             const newFileName = matchingFile 
//                 ? `${date}-${separator}${matchingFile.file_name}${originalExt}` 
//                 : `${date}-${originalName}${originalExt}`;
//             console.log("Multer: ", newFileName);

//             if(!req.file_paths){
//                 req.file_paths = [];
//             }
//             req.file_paths.push(`uploads/${newFileName}`);
//             cb(null, newFileName);
//         }catch(error){
//             cb(error, null);
//         }   
//     }
// });

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

module.exports = upload;