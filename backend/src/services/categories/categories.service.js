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

const getCategoryByName = async (category_name) => {
    try{
        const response = await Categories.findOne({
            where: {category_name: category_name}
        });
        return response;
    }catch(err){
        throw err;
    }
}


module.exports = { getAllCatgeories, createCategory, getCategoryByName };