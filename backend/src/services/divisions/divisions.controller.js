const { getAllDivisions, createDivision, getDivisionByName } = require('./divisions.service');


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

module.exports = { getDivisionsController, createDivisionsController };