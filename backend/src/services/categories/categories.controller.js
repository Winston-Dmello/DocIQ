const { getAllCatgeories, createCategory } = require('./categories.service');

const getCategoriesController = async (req, res, next) => {
    try{
        const categories = await getAllCatgeories();
        console.log(categories);
        return res.status(200).json({categories: categories});
    }catch(error){
        next(error);
    }
}


const createCategoriesController = async (req, res, next) => {
    try{
        const category = await createCategory(req.body.category_name);
        return res.status(200).json({category: category});
    }catch(err){
        next(err);
    }
}

module.exports = { getCategoriesController, createCategoriesController };