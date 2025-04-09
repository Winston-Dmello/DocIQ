const fs = require('fs');
const path = require('path');

const deleteFiles = async (filePaths) => {
    console.log("*********************\nCONTROL REACHED DELETEFILES");

    for (const filePath of filePaths) {
        const fullPath = path.join(__dirname, '../../', filePath);

        try {
            await fs.promises.access(fullPath, fs.constants.F_OK);
            
            // Delete the file
            await fs.promises.unlink(fullPath); // Delete the file
            console.log(`Deleted: ${fullPath}`);
        } catch (error) {
            console.error(`Error deleting ${fullPath}:`, error);
            throw new Error(`Failed to delete file: ${fullPath}`);
        }
    }
};

const generateFileName = (file, file_list) => {
    const separator = "$$$";
        const date = new Date().toISOString().split('T')[0];
        const originalExt = path.extname(file.originalname); // Extract extension
        const originalName = path.basename(file.originalname, originalExt) || `unknown_${date}`;

        const matchingFile = file_list.find(f => f.original_name === file.originalname);
        const newFileName = matchingFile 
            ? `${date}-${separator}${matchingFile.file_name}${originalExt}` 
            : `${date}-${originalName}${originalExt}`;
        return newFileName;
}

module.exports = { deleteFiles, generateFileName };