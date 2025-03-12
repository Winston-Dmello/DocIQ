const Divisions = require('../../models/divisions.model');
const { getAllDivisions, createDivision, getDivisionByName, delDivision, updateDivision } = require('./divisions.service');


const getDivisionsController = async (req, res, next) => {
    try{
        const divisions = await getAllDivisions();
        console.log(divisions);
        return res.status(200).json(divisions);
    }catch(error){
        next(error);
    }
}


const createDivisionsController = async (req, res, next) => {
    try{        

        const division = await getDivisionByName(req.body.division_name);
        if(division){
            return res.status(400).json({error: "Division already exists"});
        }
        const newDivision = await createDivision(req.body.division_name);
        return res.status(200).json({division: newDivision});
    }catch(err){
        next(err);
    }
}



const updateDivisionController = async (req, res, next) => {
    try{
        const divison_id = req.params.id;
        const { division_name } = req.body;
        const updatedDivision = await updateDivision(divison_id, division_name);
        return res.status(200).json({message: 'Division Updated Successfully', division: updatedDivision});
    }catch(err){
        next(err);
    }
}

const delDivisionController = async (req, res, next) => {
    try{
        const division_id = req.params.id;
        const deletedDivision = await delDivision(division_id);
        return res.status(200).json({message: 'Division deleted successfully', division: deletedDivision});
    }catch(err){
        next(err);
    }
}

module.exports = { 
    getDivisionsController, 
    createDivisionsController,
    updateDivisionController,
    delDivisionController 
};