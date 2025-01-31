const Divisions = require('../../models/divisions.model');

const getAllDivisions = async () => {
    try{
        const divisions = await Divisions.findAll();
        return divisions;
    }catch(error){
        throw error;
    }
}

const createDivision = async (division_name) => {
    try{
        const response = await Divisions.create({
            division_name: division_name,
        })
        console.log(response);
    }catch(error){
        throw error;
    }
}

module.exports = { createDivision, getAllDivisions };