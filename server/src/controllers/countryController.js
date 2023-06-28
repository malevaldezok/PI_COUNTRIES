
//cambiar id x cca3 en models, y index de la peticion axios 


const { Country, Activity } = require('../db')
const { Op } = require('sequelize');

//obtener todo los países
const getAllCountries = async () => Country.findAll({
    include: Activity,
});


//obtener país por nombre 
const getCountryByName = async (name) => {
        const countries = await Country.findAll({
            where: {name: { [ Op.iLike]: `%${name}%`}},
            include: Activity,
        });
        if(countries.length > 0) {
            return countries;
        } else {
            throw new Error(`No se encontró país con ese nombre: ${name}`)
    }
}

//obtener país por id
const getCountryById = async (id) => {
    const countryId = await Country.findByPk(id, {
        include: Activity,
    });
    if(countryId) return countryId;
    else {
        return { error : `No se encontró país con el ID: ${id}`}
    }
}

//

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
}