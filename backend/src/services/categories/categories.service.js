const Categories = require('../../models/categories.model');

const getAllCatgeories = async () => {
    try{
        const categories = await Categories.findAll();
        if(!categories) throw new Error('No categories found');
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

const getCategoryByID = async (category_id) => {
    try{
        const category = await Categories.findByPk(category_id);
        if (!category) throw new Error('Category not found');
        return category;
    }catch(err){
        throw err;
    }
}

const delUser = async (category_id) => {
    try{
        const category = await getCategoryByID(category_id);
        await category.destroy();
        return {message: 'Category destroyed successfully!'};
    }catch(err){
        throw err;
    }
}

const updateCategory = async (category_id, category_name) => {
    try{
        const category = await getCategoryByID(category_id);
        category.category_name = category_name;
        await category.save();
        return category;
    }catch(err){
        throw err;
    }
}

module.exports = { getAllCatgeories, createCategory, getCategoryByName, delUser, updateCategory };