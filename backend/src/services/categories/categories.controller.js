const { getAllCatgeories, createCategory, getCategoryByName, delUser, updateCategory } = require('./categories.service');

const getCategoriesController = async (req, res, next) => {
    try{
        const categories = await getAllCatgeories();
        console.log(categories);
        return res.status(200).json(categories);
    }catch(error){
        next(error);
    }
}


const createCategoriesController = async (req, res, next) => {
    try{

        const category = await getCategoryByName(req.body.category_name);
        if(category){
            return res.status(400).json({error: "Category already exists"});
        }
        const newCategory = await createCategory(req.body.category_name);
        return res.status(200).json({category: newCategory});
    }catch(err){
        next(err);
    }
}

const delCategoryController = async (req, res, next) => {
    try{
        const category_id = req.params.id;
        const response = await delUser(category_id);
        return res.json(response);
    }catch(err){
        next(err);
    }
}

const updateCategoryController = async (req, res, next) => {
    try{
        const category_id = req.params.id;
        const { category_name } = req.body;
        const updatedCategory = await updateCategory(category_id, category_name);
        res.status(200).json({message: 'Category updated successfully', category: updatedCategory});
    }catch(err){
        next(err);
    }
}

module.exports = { getCategoriesController, createCategoriesController, delCategoryController, updateCategoryController };