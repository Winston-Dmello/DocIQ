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

module.exports = { deleteFiles };