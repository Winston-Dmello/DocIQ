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

const getDivisionByName = async (division_name) => {
    try{
        const response = await Divisions.findOne({
            where: {division_name: division_name}
        });
        return response;
    }catch(err){
        throw err;
    }
}

const getDivisionByID = async (division_id) => {
    try{
        const division = await Divisions.findByPk(division_id);
        if (!division) throw new Error('Division not found!');
        return division;
    }catch(err){
        throw err;
    }
}

const updateDivision = async (division_id, division_name) => {
    try{
        const division = await getDivisionByID(division_id);
        division.division_name = division_name;
        await division.save();
        return division;
    }catch(error){
        throw error;
    }
}

const delDivision = async (division_id) => {
    try{
        const division = await getDivisionByID(division_id);
        await division.destroy();
        return {message: 'Division destroyed successfully!'};
    }catch(err){
        throw err;
    }
}

module.exports = { createDivision, getAllDivisions, getDivisionByName, delDivision, updateDivision };