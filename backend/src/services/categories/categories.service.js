const Categories = require('../../models/categories.model');

const getAllCatgeories = async () => {
    try{
        const categories = await Categories.findAll();
        return categories;
    }catch(error){
        throw error;
    }
}


const createCategory = async (category_name) => {
    try{
        const response = await Categories.create({
            category_name: category_name,
        })
        console.log(response);
    }catch(error){
        throw error;
    }
}

module.exports = { getAllCatgeories, createCategory };