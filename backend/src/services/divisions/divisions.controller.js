const { getAllDivisions, createDivision } = require('./divisions.service');


const getDivisionsController = async (req, res, next) => {
    try{
        const divisions = await getAllDivisions();
        console.log(divisions);
        return res.status(200).json({divisions: divisions});
    }catch(error){
        next(error);
    }
}


const createDivisionsController = async (req, res, next) => {
    try{
        const division = await createDivision(req.body.division_name);
        return res.status(200).json({division: division});
    }catch(err){
        next(err);
    }
}

module.exports = { getDivisionsController, createDivisionsController };